"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { scrollToId } from "./SmoothScroll";
import styles from "./Contact.module.css";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [year, setYear] = useState(2026);

  useEffect(() => setYear(new Date().getFullYear()), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <section id="contact" className={`${styles.section} wrap`} aria-labelledby="contact-title">
      <div className={`${styles.top} grid12`}>
        <span className="mono">(07) Contact</span>
        <p className={`mono ${styles.avail}`}>{site.availability}</p>
      </div>

      <h2 id="contact-title" className={styles.title}>
        Let&rsquo;s make
        <br />
        something exact.
      </h2>

      <div className={`${styles.mailRow} grid12`}>
        <a className={`${styles.mail} draw-link`} href={`mailto:${site.email}`}>
          {site.email}
        </a>
        <button type="button" className={styles.copy} onClick={copy} aria-live="polite">
          {copied ? "Copied" : "Copy address"}
        </button>
      </div>

      {site.socials.length > 0 && (
        <ul className={styles.socials}>
          {site.socials.map((s) => (
            <li key={s.href}>
              <a className="draw-link" href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      )}

      <footer className={`${styles.foot} grid12`}>
        <span className={styles.footName}>
          &copy; {year} {site.name}
        </span>
        <span className={`mono ${styles.footSet}`}>Set in Anybody &amp; JetBrains Mono</span>
        <button type="button" className={`${styles.top2} draw-link`} onClick={() => scrollToId("index")}>
          Back to top
        </button>
      </footer>
    </section>
  );
}
