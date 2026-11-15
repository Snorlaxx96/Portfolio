"use client";

import { useEffect, useRef } from "react";
import { principles } from "@/content/site";
import { getGsap, prefersReducedMotion } from "./motion";
import styles from "./Principles.module.css";

export function Principles() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(`.${styles.row}`).forEach((row) => {
        gsap.from(row.querySelectorAll("[data-rise]"), {
          yPercent: 110,
          duration: 1,
          ease: "expo.out",
          stagger: 0.06,
          scrollTrigger: { trigger: row, start: "top 80%" },
        });
        gsap.from(row, {
          "--line": 0,
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: { trigger: row, start: "top 85%" },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className={`${styles.section} band-dark wrap`} aria-labelledby="principles-title">
      <div className={`${styles.head} grid12`}>
        <span className="mono">(03) Principles</span>
        <h2 id="principles-title" className={styles.headTitle}>
          Three rules I break last.
        </h2>
      </div>
      <ol className={styles.list}>
        {principles.map((p, i) => (
          <li key={p.word} className={`${styles.row} grid12`} tabIndex={0}>
            <span className={`mono ${styles.idx}`}>
              {String(i + 1).padStart(2, "0")} / {String(principles.length).padStart(2, "0")}
            </span>
            <span className={styles.wordClip}>
              <span data-rise className={styles.word}>
                {p.word}
              </span>
            </span>
            <div className={styles.copy}>
              <p className={styles.line}>{p.line}</p>
              <p className={styles.detail}>{p.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
