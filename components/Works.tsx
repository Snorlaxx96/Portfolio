"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "@/content/site";
import { Cover } from "./Cover";
import { getGsap, prefersReducedMotion } from "./motion";
import styles from "./Works.module.css";

export function Works() {
  const sectionRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current!;
    const preview = previewRef.current!;
    const reduce = prefersReducedMotion();
    const { gsap } = getGsap();
    const xTo = gsap.quickTo(preview, "x", { duration: reduce ? 0 : 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(preview, "y", { duration: reduce ? 0 : 0.6, ease: "power3.out" });
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      xTo(e.clientX);
      yTo(e.clientY);
    };
    section.addEventListener("pointermove", onMove);

    const ctx = gsap.context(() => {
      if (reduce) return;
      gsap.from(`.${styles.row}`, {
        yPercent: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.06,
        scrollTrigger: { trigger: `.${styles.list}`, start: "top 80%" },
      });
    }, section);

    return () => {
      section.removeEventListener("pointermove", onMove);
      ctx.revert();
    };
  }, []);

  const showPreview = hover !== null && open === null;

  return (
    <section ref={sectionRef} id="works" className={`${styles.section} band-paper wrap`} aria-labelledby="works-title">
      <div className={`${styles.head} grid12`}>
        <span className="mono">(05) Selected works</span>
        <h2 id="works-title" className={styles.title}>
          Works
        </h2>
        <span className={`mono ${styles.count}`}>
          {String(projects.length).padStart(2, "0")} projects, 2024 to 2026
          {projects.some((p) => p.sample) && (
            <>
              <br />
              Sample case studies
            </>
          )}
        </span>
      </div>

      <div className={`${styles.cols} grid12 mono`} aria-hidden="true">
        <span>No.</span>
        <span>Project</span>
        <span className={styles.hideSm}>Discipline</span>
        <span className={styles.year}>Year</span>
      </div>

      <ul className={styles.list} onPointerLeave={() => setHover(null)}>
        {projects.map((p, i) => {
          const isOpen = open === i;
          return (
            <li key={p.slug} className={styles.item} data-dim={hover !== null && hover !== i && open === null ? "true" : undefined}>
              <button
                type="button"
                className={`${styles.row} grid12`}
                aria-expanded={isOpen}
                aria-controls={`work-${p.slug}`}
                onPointerEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className={`mono ${styles.no}`}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.name}>{p.title}</span>
                <span className={`${styles.disc} ${styles.hideSm}`}>{p.discipline}</span>
                <span className={`mono ${styles.year}`}>{p.year}</span>
                <span className={styles.plus} aria-hidden="true" data-open={isOpen ? "true" : undefined} />
              </button>
              <div id={`work-${p.slug}`} className={styles.panel} data-open={isOpen ? "true" : undefined} role="region" aria-label={p.title} inert={!isOpen} aria-hidden={!isOpen}>
                <div className={styles.panelInner}>
                  <div className={`${styles.detail} grid12`}>
                    <div className={styles.cover}>
                      <Cover kind={p.cover} title={p.title} />
                    </div>
                    <div className={styles.info}>
                      <p className={`mono ${styles.client}`}>{p.client}</p>
                      <p className={styles.summary}>{p.summary}</p>
                      <ul className={styles.roles}>
                        {p.role.map((r) => (
                          <li key={r}>{r}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div ref={previewRef} className={styles.preview} data-show={showPreview ? "true" : undefined} aria-hidden="true">
        <div className={styles.previewCard}>
          {projects.map((p, i) => (
            <div key={p.slug} className={styles.previewLayer} data-active={hover === i ? "true" : undefined}>
              <Cover kind={p.cover} title={p.title} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
