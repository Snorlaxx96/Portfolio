"use client";

import { useState } from "react";
import { services } from "@/content/site";
import styles from "./Services.module.css";

export function Services() {
  const [open, setOpen] = useState(0);
  const [peek, setPeek] = useState<number | null>(null);
  const shown = peek ?? open;

  return (
    <section id="services" className={`${styles.section} band-dark wrap`} aria-labelledby="services-title">
      <div className={`${styles.layout} grid12`}>
        <div className={styles.aside}>
          <div className={styles.stick}>
            <span className="mono">(06) Services</span>
            <h2 id="services-title" className={styles.title}>
              What I do
            </h2>
            <div className={styles.numeral} aria-hidden="true">
              <span key={shown} className={styles.digit}>
                {String(shown + 1).padStart(2, "0")}
              </span>
              <span className={styles.of}>/{String(services.length).padStart(2, "0")}</span>
            </div>
          </div>
        </div>

        <ul className={styles.list} onPointerLeave={() => setPeek(null)}>
          {services.map((s, i) => {
            const isOpen = open === i;
            return (
              <li key={s.name} className={styles.item} data-open={isOpen ? "true" : undefined}>
                <h3 className={styles.h3}>
                  <button
                    type="button"
                    className={styles.trigger}
                    aria-expanded={isOpen}
                    aria-controls={`svc-${i}`}
                    onPointerEnter={() => setPeek(i)}
                    onClick={() => setOpen(i)}
                  >
                    <span className={`mono ${styles.idx}`}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={styles.name}>{s.name}</span>
                    <span className={styles.chev} aria-hidden="true" />
                  </button>
                </h3>
                <div id={`svc-${i}`} className={styles.panel} inert={!isOpen} aria-hidden={!isOpen}>
                  <div className={styles.panelInner}>
                    <p className={styles.blurb}>{s.blurb}</p>
                    <ul className={styles.scope}>
                      {s.scope.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
