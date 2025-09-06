"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const GA_MEASUREMENT_ID = "G-ET03KCVZWR";

export function GAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;

    const url = pathname + searchParams.toString();
    window.gtag?.("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }, [pathname, searchParams]);

  return null;
}