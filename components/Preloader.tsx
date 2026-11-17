"use client";

import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import { getGsap, prefersReducedMotion } from "./motion";
import styles from "./Preloader.module.css";

const SEEN_KEY = "mhyco:intro-seen";
const MIN_LOAD_MS = 1500; // the counter never finishes faster than this, even on a warm cache
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

export function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current!;
    const { gsap } = getGsap();

    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      /* storage blocked: just play the intro */
    }
    const markSeen = () => {
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* ignore */
      }
    };
    const done = () => {
      if (window.__introDone) return;
      markSeen();
      root.remove();
      finishIntro();
    };
    // If the CSS failsafe ever fires (stalled timeline), still hand the page back properly.
    root.addEventListener("animationend", done);

    // Repeat visit in this session: get out of the way at once.
    if (seen) {
      root.remove();
      finishIntro();
      return;
    }

    document.documentElement.classList.add("is-intro");
    const lock = requestAnimationFrame(() => window.__lenis?.stop());
    window.scrollTo(0, 0);

    if (prefersReducedMotion()) {
      const t = gsap.to(root, {
        opacity: 0,
        duration: 0.4,
        delay: 0.3,
        onComplete: done,
      });
      return () => {
        cancelAnimationFrame(lock);
        root.removeEventListener("animationend", done);
        t.kill();
      };
    }

    // Real readiness: fonts plus the window load event, with a floor so the sequence can be read.
    // Capped at 6s so a slow third-party request can never hold the page hostage.
    const ready = Promise.race([
      Promise.all([
        document.fonts?.ready ?? Promise.resolve(),
        document.readyState === "complete" ? Promise.resolve() : new Promise((r) => window.addEventListener("load", r, { once: true })),
        new Promise((r) => setTimeout(r, MIN_LOAD_MS)),
      ]),
      new Promise((r) => setTimeout(r, 6000)),
    ]);

    const counter = { v: 0 };
    const render = () => {
      const v = Math.round(counter.v);
      if (countRef.current) countRef.current.textContent = String(v).padStart(3, "0");
      if (barRef.current) barRef.current.style.transform = `scaleX(${counter.v / 100})`;
    };

    const ctx = gsap.context(() => {
      gsap.from("[data-pl-word]", { yPercent: 110, duration: 0.9, ease: "expo.out", stagger: 0.12, delay: 0.15 });
      gsap.from("[data-pl-fade]", { opacity: 0, y: 12, duration: 0.7, ease: "power3.out", stagger: 0.08, delay: 0.25 });
      // Crawl toward 90% while loading; the last stretch only runs once everything is ready.
      gsap.to(counter, { v: 90, duration: MIN_LOAD_MS / 1000, ease: "power2.out", onUpdate: render });
    }, root);

    let exit: gsap.core.Timeline | undefined;
    let cancelled = false;
    ready.then(() => {
      if (cancelled) return;
      // The timeline is in charge now; stop the CSS failsafe from cutting it short.
      root.style.animation = "none";
      exit = gsap.timeline({ onComplete: done });
      exit
        .to(counter, { v: 100, duration: 0.35, ease: "power2.inOut", onUpdate: render })
        // acid field opens out of the progress line and carries one line of copy
        .fromTo(
          `.${styles.flash}`,
          { clipPath: "inset(50% 0% 50% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: "expo.inOut" },
          "+=0.1",
        )
        .from(`.${styles.flashLine}`, { yPercent: 110, duration: 0.6, ease: "expo.out", stagger: 0.06 }, "-=0.25")
        // pinch the whole screen back into a thin bar, then let the bar snap open sideways
        .fromTo(
          root,
          { clipPath: "inset(0% 0% 0% 0%)" },
          { clipPath: "inset(49.6% 0% 49.6% 0%)", duration: 0.5, ease: "expo.inOut", immediateRender: false },
          "+=0.35",
        )
        .to(root, { clipPath: "inset(49.6% 50% 49.6% 50%)", duration: 0.4, ease: "expo.in" });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(lock);
      root.removeEventListener("animationend", done);
      ctx.revert();
      exit?.kill();
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.root} aria-hidden="true" data-preloader>
      <div className={`${styles.grid} grid12 wrap`}>
        <p className={styles.lede}>
          <span className={styles.clip}>
            <span data-pl-word>Drawn with the same pencil</span>
          </span>
        </p>
        {WORDS.map((w, i) => (
          <span key={w} className={`${styles.word} ${styles[`w${i}`]}`}>
            <span className={styles.clip}>
              <span data-pl-word>{w}</span>
            </span>
          </span>
        ))}
      </div>

      <div className={`${styles.foot} grid12 wrap`}>
        <p className={`${styles.who} mono`} data-pl-fade>
          {site.name}
          <br />
          <span className={styles.muted}>{site.role}</span>
        </p>
        <p className={`${styles.count} mono`} data-pl-fade>
          Loading <span ref={countRef}>000</span>%
        </p>
      </div>

      <span className={styles.track}>
        <span ref={barRef} className={styles.bar} />
      </span>

      <div className={styles.flash}>
        {/* two deliberate lines, each in its own clip, instead of letting the phrase break anywhere */}
        <p className={styles.flashText}>
          <span className={styles.clip}>
            <span className={styles.flashLine}>Every line</span>
          </span>
          <br />
          <span className={styles.clip}>
            <span className={styles.flashLine}>earns its place</span>
          </span>
        </p>
      </div>
    </div>
  );
}
