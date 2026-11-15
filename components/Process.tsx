"use client";

import { useEffect, useRef } from "react";
import { process } from "@/content/site";
import { Diagram } from "./Diagram";
import { getGsap, prefersReducedMotion } from "./motion";
import styles from "./Process.module.css";

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current!;
    const track = trackRef.current!;
    const { gsap } = getGsap();
    const reduce = prefersReducedMotion();
    const mm = gsap.matchMedia();

    mm.add("(min-width: 900px)", () => {
      if (reduce) return;
      section.dataset.horizontal = "true";
      const distance = () => track.scrollWidth - window.innerWidth;
      const setHeight = () => {
        section.style.height = `${distance() + window.innerHeight}px`;
      };
      setHeight();
      const slide = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: true,
          invalidateOnRefresh: true,
          onRefreshInit: setHeight,
        },
      });
      track.querySelectorAll<HTMLElement>("[data-panel]").forEach((panel) => {
        gsap.fromTo(
          panel.querySelectorAll("[data-draw]"),
          { strokeDashoffset: 1, strokeDasharray: 1 },
          {
            strokeDashoffset: 0,
            ease: "none",
            stagger: 0.04,
            scrollTrigger: { trigger: panel, containerAnimation: slide, start: "left 85%", end: "center 55%", scrub: true },
          },
        );
      });
      return () => {
        delete section.dataset.horizontal;
        section.style.height = "";
      };
    });

    mm.add("(max-width: 899px)", () => {
      if (reduce) return;
      track.querySelectorAll<HTMLElement>("[data-panel]").forEach((panel) => {
        gsap.fromTo(
          panel.querySelectorAll("[data-draw]"),
          { strokeDashoffset: 1, strokeDasharray: 1 },
          { strokeDashoffset: 0, duration: 1.4, ease: "power2.out", stagger: 0.05, scrollTrigger: { trigger: panel, start: "top 75%" } },
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process" className={styles.section} aria-labelledby="process-title">
      <div className={styles.sticky}>
        <div ref={trackRef} className={styles.track}>
          <div className={`${styles.intro} wrap`}>
            <span className="mono">(04) Process</span>
            <h2 id="process-title" className={styles.title}>
              Four stages.
              <br />
              One direction.
            </h2>
            <p className={`${styles.introText} measure`}>
              Every project moves through the same sequence, whatever the medium. It keeps the work honest and keeps you from
              paying for decisions twice.
            </p>
          </div>
          {process.map((p, i) => (
            <article key={p.step} data-panel className={styles.panel}>
              <div className={styles.panelHead}>
                <span className={`mono ${styles.num}`}>Stage {String(i + 1).padStart(2, "0")}</span>
                <h3 className={styles.step}>{p.step}</h3>
              </div>
              <div className={styles.diagram}>
                <Diagram index={i} />
              </div>
              <div className={styles.body}>
                <p className={styles.text}>{p.text}</p>
                <ul className={styles.out}>
                  {p.out.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
