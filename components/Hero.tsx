"use client";

import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import { getGsap, prefersReducedMotion } from "./motion";
import { onIntroDone } from "./Preloader";
import { scrollToId } from "./SmoothScroll";
import styles from "./Hero.module.css";

// Anybody's width axis runs 50 to 150; the wordmark rests expanded and trades width around the cursor.
const WDTH_MIN = 50;
const WDTH_MAX = 150;
const WDTH_REST = 122;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);
  const coordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current!;
    const word = wordRef.current!;
    const inner = innerRef.current!;
    const letters = Array.from(inner.querySelectorAll<HTMLSpanElement>("[data-l]"));
    const reduce = prefersReducedMotion();
    const { gsap } = getGsap();

    // Fit the word to the full container width at the neutral width axis.
    const fit = () => {
      inner.style.transform = "none";
      letters.forEach((l) => l.style.setProperty("--w", String(WDTH_REST)));
      inner.style.fontSize = "100px";
      const ratio = word.clientWidth / inner.scrollWidth;
      inner.style.fontSize = `${100 * ratio}px`;
    };
    fit();
    document.fonts?.ready.then(fit);

    const current = letters.map(() => WDTH_REST);
    const target = letters.map(() => WDTH_REST);
    let pointerX: number | null = null;
    let raf = 0;
    let t0 = performance.now();
    const fine = window.matchMedia("(pointer: fine)").matches;

    let running = false;
    const loop = (now: number) => {
      const rect = inner.getBoundingClientRect();
      // On touch screens a slow wave runs through the word instead of following a cursor.
      const px = pointerX ?? (fine ? null : rect.left + ((Math.sin((now - t0) / 1600) + 1) / 2) * rect.width);
      if (px === null) {
        target.fill(WDTH_REST);
      } else {
        const sigma = rect.width / letters.length;
        const infl = letters.map((l) => {
          const r = l.getBoundingClientRect();
          const d = (r.left + r.width / 2 - px) / sigma;
          return Math.exp(-d * d);
        });
        const mean = infl.reduce((a, b) => a + b, 0) / infl.length;
        infl.forEach((v, i) => {
          target[i] = Math.min(WDTH_MAX, Math.max(WDTH_MIN, WDTH_REST + (v - mean) * 190));
        });
      }
      let moving = false;
      letters.forEach((l, i) => {
        const delta = target[i] - current[i];
        if (Math.abs(delta) > 0.02) moving = true;
        current[i] += delta * 0.12;
        l.style.setProperty("--w", current[i].toFixed(2));
      });
      // Keep the word exactly full-bleed while letters trade width with each other.
      // scrollWidth ignores transforms, so one layout read per frame is enough (no reset to "none").
      const scale = word.clientWidth / inner.scrollWidth;
      inner.style.transform = `scaleX(${scale.toFixed(4)})`;
      // Mouse users: sleep once the letters settle and nothing is hovering; pointermove wakes it.
      if (!moving && pointerX === null && fine) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    const wake = () => {
      if (running || !window.__introDone) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointerX = e.clientX;
      wake();
      const r = section.getBoundingClientRect();
      if (coordRef.current) {
        const x = String(Math.round(e.clientX - r.left)).padStart(4, "0");
        const y = String(Math.round(e.clientY - r.top)).padStart(4, "0");
        coordRef.current.textContent = `X ${x}  Y ${y}`;
      }
    };
    const onLeave = () => {
      pointerX = null;
    };

    if (!reduce) {
      section.addEventListener("pointermove", onMove);
      section.addEventListener("pointerleave", onLeave);
    }

    // The entrance waits for the preloader: hide the letters now, play the rise once it hands over.
    // The width loop also waits, so it never competes with the intro for frames.
    // Intro copy starts hidden too, so nothing snaps from visible to hidden at the hand-over.
    // Repeat visits have no cover to hide behind: hiding the painted hero then would read as a blink,
    // so the entrance only plays on the visit that shows the preloader.
    const entrance = !reduce && !document.documentElement.classList.contains("intro-seen");
    const reveals = section.querySelectorAll(`.${styles.reveal}`);
    if (entrance) {
      gsap.set(letters, { yPercent: 120 });
      gsap.set(reveals, { y: 24, opacity: 0 });
    }
    const stopWaiting = onIntroDone(() => {
      if (reduce) return;
      t0 = performance.now();
      if (!fine) wake(); // touch screens run the slow wave continuously
      if (!entrance) return;
      gsap.to(letters, { yPercent: 0, duration: 1.1, ease: "expo.out", stagger: 0.07 });
      gsap.to(reveals, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.08, delay: 0.3 });
    });

    window.addEventListener("resize", fit);
    return () => {
      stopWaiting();
      cancelAnimationFrame(raf);
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", fit);
    };
  }, []);

  return (
    <section ref={sectionRef} id="index" className={styles.hero} aria-labelledby="hero-title">
      <div className={`${styles.top} grid12 wrap`}>
        <div className={styles.meta}>
          <p className={`${styles.reveal} mono`}>{site.role}</p>
          <p className={`${styles.reveal} mono ${styles.muted}`}>{site.availability}</p>
        </div>
        <p className={`${styles.intro} ${styles.reveal}`}>{site.intro}</p>
        <a
          href="#contact"
          className={`${styles.reveal} ${styles.cta}`}
          onClick={(e) => {
            e.preventDefault();
            scrollToId("contact");
          }}
        >
          Start a project
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M3 13 13 3M5 3h8v8" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </a>
      </div>

      <div className={`${styles.foot} wrap`}>
        <span ref={coordRef} className={`mono ${styles.coord}`} aria-hidden="true">
          X 0000  Y 0000
        </span>
        <span className={`mono ${styles.muted}`}>Scroll</span>
      </div>

      <h1 id="hero-title" className={`${styles.title} wrap`}>
        <span className="sr-only">{site.name}</span>
        <div ref={wordRef} className={styles.word} aria-hidden="true">
          <span ref={innerRef} className={styles.inner}>
            {site.wordmark.split("").map((ch, i) => (
              <span key={i} className={styles.clip}>
                <span data-l className={styles.letter}>
                  {ch}
                </span>
              </span>
            ))}
          </span>
        </div>
      </h1>
    </section>
  );
}
