"use client";

import { useEffect, useRef } from "react";
import { manifesto } from "@/content/site";
import { getGsap, prefersReducedMotion } from "./motion";
import styles from "./Manifesto.module.css";

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current!;
    if (prefersReducedMotion()) {
      section.dataset.static = "true";
      return;
    }
    const { gsap } = getGsap();
    const words = section.querySelectorAll<HTMLSpanElement>("[data-w]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.5,
          scrollTrigger: { trigger: section, start: "top top", end: "70% bottom", scrub: true },
        },
      );
      gsap.fromTo(
        `.${styles.rule}`,
        { scaleX: 0 },
        { scaleX: 1, ease: "none", scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: true } },
      );
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className={styles.section} aria-label="Manifesto">
      <div className={`${styles.sticky} wrap`}>
        <div className={styles.head}>
          <span className="mono">(01) Manifesto</span>
          <span className={styles.rule} aria-hidden="true" />
        </div>
        <p className={styles.text}>
          {manifesto.split(" ").map((w, i) => (
            <span key={i} data-w className={styles.word}>
              {w}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
