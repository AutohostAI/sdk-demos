/**
 * DemoBanner — Demo Mode Indicator
 *
 * Thin amber banner displayed at the top of the page to indicate that
 * the current brand theming is for demonstration purposes only.
 *
 * Only visible when a brand theme is active (non-null, non-default).
 *
 * @demo This component is for demonstration purposes only.
 */
"use client";

import { useBrandTheme } from "@/context/BrandThemeContext";
import { AlertTriangle } from "lucide-react";

export const DemoBanner = () => {
  const { theme } = useBrandTheme();

  if (!theme || theme.id === "none") return null;

  return (
    <div className="flex w-full items-center justify-center gap-2 bg-amber-400 px-4 py-1.5 text-xs font-medium tracking-wide text-amber-950">
      <AlertTriangle className="h-3 w-3" />
      <span>DEMO PREVIEW — Branding is for demonstration only</span>
    </div>
  );
};
