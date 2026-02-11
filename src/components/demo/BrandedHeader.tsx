/**
 * BrandedHeader — Themed Property Header with Progress Indicator
 *
 * Displays the property logo (Lucide icon), property name, and a step
 * progress indicator. The background uses the theme's headerGradient
 * or falls back to the primary color.
 *
 * Only renders when a brand theme is active (non-null, non-default).
 *
 * @demo This component is for demonstration purposes only.
 */
"use client";

import { useBrandTheme } from "@/context/BrandThemeContext";
import {
  Hotel,
  Waves,
  Building2,
  Trees,
  Home,
  Mountain,
  Tent,
  Castle,
  type LucideIcon,
} from "lucide-react";

/** Static mapping of icon name strings to Lucide components */
const iconMap: Record<string, LucideIcon> = {
  Hotel,
  Waves,
  Building2,
  Trees,
  Home,
  Mountain,
  Tent,
  Castle,
};

interface BrandedHeaderProps {
  currentStep: number;
  totalSteps: number;
}

/** Descriptive labels for each wizard step (hotel check-in language). */
const stepLabels = ["Welcome", "Guest Details", "Agreement", "Verification", "Complete"];

export const BrandedHeader = ({
  currentStep,
  totalSteps,
}: BrandedHeaderProps) => {
  const { theme } = useBrandTheme();

  if (!theme || theme.id === "none") return null;

  const IconComponent = iconMap[theme.logoIcon] ?? Hotel;
  const progressPercent = Math.min(
    ((currentStep + 1) / totalSteps) * 100,
    100
  );
  const currentLabel = stepLabels[currentStep] ?? `Step ${currentStep + 1}`;

  const fgColor = theme.headerForegroundHsl ?? "white";

  const backgroundStyle: React.CSSProperties = theme.headerGradient
    ? { background: theme.headerGradient }
    : { backgroundColor: theme.primaryHsl };

  return (
    <header className="w-full" style={backgroundStyle}>
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        {/* Logo + property name */}
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg backdrop-blur-sm"
            style={{ backgroundColor: `color-mix(in srgb, ${fgColor} 20%, transparent)` }}
          >
            <IconComponent
              className="h-5 w-5"
              style={{ color: fgColor }}
            />
          </div>
          <span
            className="text-lg font-semibold tracking-tight"
            style={{ color: fgColor }}
          >
            {theme.propertyName}
          </span>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-3">
          <span
            className="text-xs font-medium"
            style={{ color: fgColor, opacity: 0.7 }}
          >
            Step {currentStep + 1} &mdash; {currentLabel}
          </span>
          <div className="flex gap-1">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className="h-1.5 w-6 rounded-full transition-colors"
                style={{
                  backgroundColor: fgColor,
                  opacity: i <= currentStep ? 1 : 0.3,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div
        className="h-0.5 w-full"
        style={{ backgroundColor: `color-mix(in srgb, ${fgColor} 10%, transparent)` }}
      >
        <div
          className="h-full transition-all duration-500 ease-out"
          style={{
            width: `${progressPercent}%`,
            backgroundColor: `color-mix(in srgb, ${fgColor} 60%, transparent)`,
          }}
        />
      </div>
    </header>
  );
};
