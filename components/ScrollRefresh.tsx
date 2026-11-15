"use client";

import { useEffect } from "react";
import { getGsap } from "./motion";

// Rendered after every section so its effect runs last: sections that resize themselves on mount
// (the pinned process track) would otherwise leave earlier triggers measuring stale positions.
export function ScrollRefresh() {
  useEffect(() => {
    const { ScrollTrigger } = getGsap();
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(raf);
  }, []);
  return null;
}
