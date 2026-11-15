"use client";

import { useEffect, useRef } from "react";
import { helixWords } from "@/content/site";
import { getGsap, prefersReducedMotion } from "./motion";
import styles from "./Philosophy.module.css";

const LINES = ["Form is how", "an idea", "introduces itself."];

export function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const section = sectionRef.current!;
    const canvas = canvasRef.current!;
    const reduce = prefersReducedMotion();
    if (reduce) section.dataset.static = "true";

    let cleanup: (() => void) | undefined;
    let cancelled = false;
    let progress = 0;

    const { gsap, ScrollTrigger } = getGsap();
    const ctx = gsap.context(() => {
      if (reduce) return;
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          progress = self.progress;
        },
      });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: true },
      });
      section.querySelectorAll<HTMLElement>("[data-line]").forEach((line, i) => {
        tl.fromTo(line, { opacity: 0, yPercent: 40 }, { opacity: 1, yPercent: 0, duration: 1 }, i * 1.2 + 0.6);
      });
      tl.to({}, { duration: 1 });
    }, section);

    // Build the WebGL scene only when the section gets close to the viewport.
    const io = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting || cleanup) return;
        io.disconnect();
        const THREE = await import("three");
        await document.fonts?.ready;
        if (cancelled) return;

        const family = getComputedStyle(document.body).fontFamily;
        const small = window.innerWidth < 768;
        let renderer: import("three").WebGLRenderer;
        try {
          renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
        } catch {
          return; // no WebGL: the static word field in the markup stays visible
        }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
        const group = new THREE.Group();
        scene.add(group);

        const makeTexture = (word: string, color: string) => {
          const c = document.createElement("canvas");
          const ctx2 = c.getContext("2d")!;
          const size = 128;
          // Canvas text cannot set the width axis, so the helix uses the heavy upright cut.
          ctx2.font = `800 ${size}px ${family}`;
          const w = Math.ceil(ctx2.measureText(word).width) + 24;
          c.width = w;
          c.height = size * 1.3;
          ctx2.font = `800 ${size}px ${family}`;
          ctx2.fillStyle = color;
          ctx2.textBaseline = "middle";
          ctx2.fillText(word, 12, c.height / 2);
          const tex = new THREE.CanvasTexture(c);
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.anisotropy = 4;
          return { tex, aspect: w / c.height };
        };

        const count = small ? 26 : 40;
        const radius = small ? 2.6 : 4.2;
        const pitch = 0.42;
        const meshes: { mesh: import("three").Mesh; mat: import("three").MeshBasicMaterial }[] = [];
        const textures = new Map<string, ReturnType<typeof makeTexture>>();
        for (let i = 0; i < count; i++) {
          const word = helixWords[i % helixWords.length];
          const accent = word === "Signal";
          const key = word + accent;
          if (!textures.has(key)) textures.set(key, makeTexture(word, accent ? "#d7ff3b" : "#eeede6"));
          const { tex, aspect } = textures.get(key)!;
          const h = small ? 0.42 : 0.6;
          const geo = new THREE.PlaneGeometry(h * aspect, h);
          const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.DoubleSide, depthWrite: false });
          const mesh = new THREE.Mesh(geo, mat);
          const theta = i * 0.62;
          mesh.position.set(Math.sin(theta) * radius, (i - count / 2) * pitch, Math.cos(theta) * radius);
          mesh.rotation.y = theta;
          group.add(mesh);
          meshes.push({ mesh, mat });
        }

        // A thin spine traces the helix path.
        const pts: import("three").Vector3[] = [];
        for (let t = 0; t <= count; t += 0.1) {
          const theta = t * 0.62;
          pts.push(new THREE.Vector3(Math.sin(theta) * radius * 0.98, (t - count / 2) * pitch - 0.35, Math.cos(theta) * radius * 0.98));
        }
        const spineGeo = new THREE.BufferGeometry().setFromPoints(pts);
        const spineMat = new THREE.LineBasicMaterial({ color: 0xd7ff3b, transparent: true, opacity: 0.35 });
        group.add(new THREE.Line(spineGeo, spineMat));

        const resize = () => {
          const { clientWidth: w, clientHeight: h } = canvas;
          renderer.setSize(w, h, false);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
        };
        resize();
        window.addEventListener("resize", resize);

        let mx = 0;
        let my = 0;
        const onMove = (e: PointerEvent) => {
          mx = (e.clientX / window.innerWidth - 0.5) * 2;
          my = (e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener("pointermove", onMove);

        const tmp = new THREE.Vector3();
        let smooth = 0;
        let visible = true;
        const vis = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
        vis.observe(section);

        const render = () => {
          smooth += (progress - smooth) * 0.08;
          const span = count * pitch;
          group.rotation.y = smooth * Math.PI * 2.4 + mx * 0.08;
          group.position.y = -span * 0.5 + smooth * span * 0.9;
          group.rotation.x = 0.18 + my * 0.04;
          camera.position.set(0, 0, small ? 9 : 12.5 - smooth * 3);
          camera.lookAt(0, 0, 0);
          // Fade words on the far side of the helix so the front reads clearly.
          for (const { mesh, mat } of meshes) {
            mesh.getWorldPosition(tmp);
            const front = (tmp.z / radius + 1) / 2;
            const vert = 1 - Math.min(1, Math.abs(tmp.y) / 5.5);
            mat.opacity = (0.08 + front * 0.92) * Math.max(0, vert);
          }
          renderer.render(scene, camera);
        };

        let raf = 0;
        const loop = () => {
          if (visible) render();
          raf = requestAnimationFrame(loop);
        };
        progress = reduce ? 0.35 : progress;
        smooth = progress;
        render();
        // Hide the static fallback only once a frame has actually drawn without GL errors.
        const gl = renderer.getContext();
        // three.js marks a program non-runnable when its shaders fail to compile or link.
        const programsOk = (renderer.info.programs ?? []).every(
          (p) => !(p as { diagnostics?: { runnable: boolean } }).diagnostics || (p as { diagnostics?: { runnable: boolean } }).diagnostics!.runnable,
        );
        if (programsOk && gl.getError() === gl.NO_ERROR && !gl.isContextLost()) section.dataset.gl = "on";
        if (!reduce) raf = requestAnimationFrame(loop);

        cleanup = () => {
          cancelAnimationFrame(raf);
          vis.disconnect();
          window.removeEventListener("resize", resize);
          window.removeEventListener("pointermove", onMove);
          meshes.forEach(({ mesh, mat }) => {
            mesh.geometry.dispose();
            mat.dispose();
          });
          textures.forEach(({ tex }) => tex.dispose());
          spineGeo.dispose();
          spineMat.dispose();
          renderer.dispose();
        };
      },
      { rootMargin: "100% 0px" },
    );
    io.observe(section);

    return () => {
      cancelled = true;
      io.disconnect();
      ctx.revert();
      cleanup?.();
    };
  }, []);

  return (
    <section ref={sectionRef} id="philosophy" className={`${styles.section} band-dark`} aria-labelledby="philosophy-title">
      <div className={styles.sticky}>
        <ul className={styles.fallback} aria-hidden="true">
          {helixWords.map((w) => (
            <li key={w} data-accent={w === "Signal" ? "true" : undefined}>
              {w}
            </li>
          ))}
        </ul>
        <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
        <div className={`${styles.overlay} wrap`}>
          <span className="mono">(02) Philosophy</span>
          <h2 id="philosophy-title" className={styles.title}>
            {LINES.map((l) => (
              <span key={l} data-line className={styles.line}>
                {l}
              </span>
            ))}
          </h2>
          <p className={`mono ${styles.hint}`}>Twelve words I check every project against</p>
        </div>
      </div>
    </section>
  );
}
