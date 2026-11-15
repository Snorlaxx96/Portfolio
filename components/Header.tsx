"use client";

import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/content/site";
import { getGsap } from "./motion";
import { scrollToId } from "./SmoothScroll";
import styles from "./Header.module.css";

export function Header() {
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string>("index");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const { ScrollTrigger } = getGsap();
    const triggers = nav.map((item, i) =>
      ScrollTrigger.create({
        trigger: `#${item.id}`,
        start: "top 50%",
        end: "bottom 50%",
        onUpdate: (self) => barRefs.current[i]?.style.setProperty("--p", self.progress.toFixed(4)),
        onToggle: (self) => self.isActive && setActive(item.id),
      }),
    );
    const tone = ScrollTrigger.create({
      trigger: "#contact",
      start: "top 40px",
      // "bottom top" lies past max scroll, so the trigger stays active at the very end of the page
      end: "bottom top",
      onToggle: (self) => {
        if (headerRef.current) headerRef.current.dataset.tone = self.isActive ? "accent" : "";
      },
    });
    return () => {
      triggers.forEach((t) => t.kill());
      tone.kill();
    };
  }, []);

  const go = (id: string) => {
    dialogRef.current?.close();
    scrollToId(id);
  };

  return (
    <header ref={headerRef} className={styles.header}>
      <div className={`${styles.row} wrap`}>
        <button type="button" className={styles.mark} onClick={() => go("index")} aria-label={`${site.name}, back to top`}>
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M8 0v16M0 8h16" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
        <nav aria-label="Sections" className={styles.cols}>
          {nav.map((item, i) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={styles.col}
              aria-current={active === item.id ? "true" : undefined}
              onClick={(e) => {
                e.preventDefault();
                go(item.id);
              }}
            >
              <span className={styles.label}>{item.label}</span>
              <span className={styles.track} aria-hidden="true">
                <span ref={(el) => { barRefs.current[i] = el; }} className={styles.fill} />
              </span>
            </a>
          ))}
        </nav>
        <button
          type="button"
          className={styles.menuBtn}
          aria-expanded={menuOpen}
          aria-haspopup="dialog"
          onClick={() => {
            dialogRef.current?.showModal();
            setMenuOpen(true);
          }}
        >
          Menu
        </button>
      </div>

      <dialog
        ref={dialogRef}
        className={styles.sheet}
        aria-label="Site menu"
        onToggle={(e) => setMenuOpen((e.currentTarget as HTMLDialogElement).open)}
        onClose={() => setMenuOpen(false)}
      >
        <div className={`${styles.sheetTop} wrap`}>
          <span className="mono">{site.wordmark}</span>
          <button type="button" className={styles.menuBtn} onClick={() => dialogRef.current?.close()} autoFocus>
            Close
          </button>
        </div>
        <ol className={`${styles.sheetList} wrap`}>
          {nav.map((item, i) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  go(item.id);
                }}
              >
                <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </dialog>
    </header>
  );
}
