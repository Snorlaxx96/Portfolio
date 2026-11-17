"use client";

import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import { getGsap, prefersReducedMotion } from "./motion";
import styles from "./Preloader.module.css";

export const INTRO_SEEN_KEY = "mhyco:intro-seen";
const WORDS = ["identity", "interface", "space"];

declare global {
  interface Window {
    __introDone?: boolean;
  }
}

function finishIntro() {
  window.__introDone = true;
  document.documentElement.classList.remove("is-intro");
  window.__lenis?.start();
  window.dispatchEvent(new Event("intro:done"));
}

/** Runs `cb` once the preloader has handed the page over (immediately if it already has). */
export function onIntroDone(cb: () => void) {
  if (window.__introDone) {
    cb();
    return () => {};
  }
  window.addEventListener("intro:done", cb, { once: true });
  return () => window.removeEventListener("intro:done", cb);
}

/*
 * How it stays smooth:
 * - Everything that plays while the page is still loading and hydrating (word rise, fades, the
 *   progress crawl) is a CSS animation on transform/opacity. Those run on the compositor, so a busy
 *   main thread during hydration cannot freeze them, and there is no jump when React takes over.
 * - The exit only animates transforms on solid layers (two half-screen panels scaling to the centre,
 *   then a 2px bar scaling to nothing), never clip-path, so no frame needs a full-screen repaint.
 */
export function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current!;
    const html = document.documentElement;
    const { gsap } = getGsap();

    const done = () => {
      if (window.__introDone) return;
      try {
        sessionStorage.setItem(INTRO_SEEN_KEY, "1");
      } catch {
        /* storage blocked */
      }
      root.remove();
      finishIntro();
    };

    // The inline head script already decided this before first paint (see IntroFlag).
    if (html.classList.contains("intro-seen")) {
      root.remove();
      finishIntro();
      return;
    }

    html.classList.add("is-intro");
    window.scrollTo(0, 0);
    const lock = requestAnimationFrame(() => window.__lenis?.stop());
    // The CSS failsafe (8s) still hands the page back if anything below stalls.
    root.addEventListener("animationend", (e) => e.target === root && done());

    if (prefersReducedMotion()) {
      const t = gsap.to(root, { opacity: 0, duration: 0.4, delay: 0.4, onComplete: done });
      return () => {
        cancelAnimationFrame(lock);
        t.kill();
      };
    }

    // Counter follows the CSS crawl's own clock, so number and bar never drift apart.
    const bar = barRef.current!;
    const crawl = bar.getAnimations()[0] as CSSAnimation | undefined;
    const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);
    let counterRaf = 0;
    let finalValue: number | null = null;
    const tickCounter = () => {
      let v: number;
      if (finalValue !== null) v = finalValue;
      else {
        const t = crawl?.currentTime ? Number(crawl.currentTime) / 1500 : 0;
        v = 90 * easeOut(Math.min(1, t));
      }
      if (countRef.current) countRef.current.textContent = String(Math.round(v)).padStart(3, "0");
      counterRaf = requestAnimationFrame(tickCounter);
    };
    counterRaf = requestAnimationFrame(tickCounter);

    // The exit is driven from JS, so it waits for an idle main thread: on slow phones hydration can
    // still be running after load, and a stall landing mid-exit is exactly the stutter we're avoiding.
    const idle = () =>
      new Promise<void>((r) =>
        "requestIdleCallback" in window ? window.requestIdleCallback(() => r(), { timeout: 700 }) : setTimeout(r, 50),
      );
    const ready = Promise.race([
      Promise.all([
        document.fonts?.ready ?? Promise.resolve(),
        document.readyState === "complete" ? Promise.resolve() : new Promise((r) => window.addEventListener("load", r, { once: true })),
        crawl?.finished.catch(() => undefined) ?? new Promise((r) => setTimeout(r, 1500)),
      ]).then(idle),
      new Promise((r) => setTimeout(r, 6000)),
    ]);

    let exit: gsap.core.Timeline | undefined;
    let cancelled = false;
    ready.then(() => {
      if (cancelled) return;
      root.style.animation = "none"; // the timeline owns the exit now

      // Hand the bar from the CSS crawl to GSAP at exactly its current scale.
      const m = new DOMMatrixReadOnly(getComputedStyle(bar).transform);
      crawl?.cancel();
      gsap.set(bar, { scaleX: m.a || 0.9, transformOrigin: "0% 50%" });

      const q = gsap.utils.selector(root);
      // The CSS start offset is parsed by GSAP as pixels; restate it as yPercent so the rise lands at 0.
      gsap.set(q("[data-flash-line]"), { y: 0, yPercent: 110 });
      const counter = { v: 90 };
      exit = gsap.timeline({ onComplete: done, defaults: { force3D: true } });
      exit
        // 1. finish loading
        .to(bar, { scaleX: 1, duration: 0.35, ease: "power2.inOut" })
        .to(counter, { v: 100, duration: 0.35, ease: "power2.inOut", onUpdate: () => (finalValue = counter.v) }, "<")
        // 2. acid opens out of the line, both halves growing away from the centre
        .to(q("[data-flash-half]"), { scaleY: 1, duration: 0.6, ease: "expo.inOut" }, "+=0.1")
        .to(q("[data-flash-line]"), { yPercent: 0, duration: 0.6, ease: "expo.out", stagger: 0.06 }, "-=0.3")
        // the graphite layer is fully covered now; drop it so the next step reveals the site directly
        .set(q("[data-cover]"), { autoAlpha: 0 })
        // 3. copy leaves, then the acid pinches back into the line
        .to(q("[data-flash-line]"), { yPercent: -110, duration: 0.35, ease: "expo.in", stagger: 0.04 }, "+=0.35")
        .to(q("[data-flash-half]"), { scaleY: 0, duration: 0.5, ease: "expo.inOut" }, "-=0.1")
        // 4. the line snaps shut from both ends toward the centre
        .set(bar, { transformOrigin: "50% 50%" })
        .to(bar, { scaleX: 0, duration: 0.4, ease: "expo.in" });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(lock);
      cancelAnimationFrame(counterRaf);
      exit?.kill();
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.root} aria-hidden="true" data-preloader>
      {/* graphite cover: two halves so it could also part from the centre */}
      <div data-cover className={styles.cover}>
        <span className={`${styles.half} ${styles.top}`} />
        <span className={`${styles.half} ${styles.bottom}`} />

        <div className={`${styles.grid} grid12 wrap`}>
          <p className={styles.lede}>
            <span className={styles.clip}>
              <span className={styles.rise} style={{ ["--i" as string]: 0 }}>
                Drawn with the same pencil
              </span>
            </span>
          </p>
          {WORDS.map((w, i) => (
            <span key={w} className={`${styles.word} ${styles[`w${i}`]}`}>
              <span className={styles.clip}>
                <span className={styles.rise} style={{ ["--i" as string]: i + 1 }}>
                  {w}
                </span>
              </span>
            </span>
          ))}
        </div>

        <div className={`${styles.foot} grid12 wrap`}>
          <p className={`${styles.who} ${styles.fade} mono`} style={{ ["--i" as string]: 0 }}>
            {site.name}
            <br />
            <span className={styles.muted}>{site.role}</span>
          </p>
          <p className={`${styles.count} ${styles.fade} mono`} style={{ ["--i" as string]: 1 }}>
            Loading <span ref={countRef}>000</span>%
          </p>
        </div>
      </div>

      <span className={`${styles.flashHalf} ${styles.top}`} data-flash-half />
      <span className={`${styles.flashHalf} ${styles.bottom}`} data-flash-half />
      <p className={styles.flashText}>
        <span className={styles.clip}>
          <span className={styles.flashLine} data-flash-line>
            Every line
          </span>
        </span>
        <br />
        <span className={styles.clip}>
          <span className={styles.flashLine} data-flash-line>
            earns its place
          </span>
        </span>
      </p>

      <span className={styles.track} aria-hidden="true">
        <span ref={barRef} className={styles.bar} />
      </span>
    </div>
  );
}
