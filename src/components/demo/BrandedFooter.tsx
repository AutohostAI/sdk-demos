/**
 * BrandedFooter — Minimal Themed Footer
 *
 * Displays "Powered by Autohost" branding along with optional contact
 * phone and address from the active theme. Designed to be subtle and
 * unobtrusive at the bottom of the registration flow.
 *
 * Only renders when a brand theme is active (non-null, non-default).
 *
 * @demo This component is for demonstration purposes only.
 */
"use client";

import { useBrandTheme } from "@/context/BrandThemeContext";
import { ShieldCheck, Phone, MapPin } from "lucide-react";

export const BrandedFooter = () => {
  const { theme } = useBrandTheme();

  if (!theme || theme.id === "none") return null;

  return (
    <footer className="w-full border-t border-border/40 bg-muted/30">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 px-6 py-5 text-xs text-muted-foreground sm:flex-row sm:justify-between">
        {/* Contact info */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          {theme.contactPhone && (
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {theme.contactPhone}
            </span>
          )}
          {theme.address && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {theme.address}
            </span>
          )}
        </div>

        {/* Powered by */}
        <span className="flex items-center gap-1 text-[11px] opacity-60">
          <ShieldCheck className="h-3 w-3" />
          Powered by Autohost
        </span>
      </div>
    </footer>
  );
};
