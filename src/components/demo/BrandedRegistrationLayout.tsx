/**
 * BrandedRegistrationLayout — Themed Layout Wrapper
 *
 * Wraps the registration flow with brand-specific UI when a theme is active:
 *   DemoBanner → BrandedHeader → {children} → BrandedFooter
 *
 * Applies CSS custom property overrides via inline styles so that all
 * shadcn/ui and Tailwind utilities that reference the design tokens
 * (--primary, --background, etc.) automatically pick up the theme colors.
 *
 * When no theme is selected (or theme is "none"), renders children
 * without any additional wrapper UI.
 *
 * @demo This component is for demonstration purposes only.
 */
"use client";

import { useBrandTheme } from "@/context/BrandThemeContext";
import { DemoBanner } from "./DemoBanner";
import { BrandedHeader } from "./BrandedHeader";
import { BrandedFooter } from "./BrandedFooter";

interface BrandedRegistrationLayoutProps {
  currentStep: number;
  totalSteps: number;
  children: React.ReactNode;
}

export const BrandedRegistrationLayout = ({
  currentStep,
  totalSteps,
  children,
}: BrandedRegistrationLayoutProps) => {
  const { theme } = useBrandTheme();

  if (!theme || theme.id === "none") {
    return <>{children}</>;
  }

  const themeStyles: React.CSSProperties & Record<string, string> = {
    "--primary": theme.primaryHsl,
    "--primary-foreground": theme.primaryForegroundHsl,
    "--background": theme.backgroundHsl,
    "--foreground": theme.foregroundHsl,
    "--card": theme.cardHsl,
    "--card-foreground": theme.cardForegroundHsl,
    "--border": theme.borderHsl,
    "--muted": theme.mutedHsl,
    "--muted-foreground": theme.mutedForegroundHsl,
    "--accent": theme.accentHsl,
    "--accent-foreground": theme.accentForegroundHsl,
    "--secondary": theme.secondaryHsl,
    "--secondary-foreground": theme.secondaryForegroundHsl,
    "--input": theme.inputHsl,
    "--ring": theme.ringHsl,
    "--popover": theme.popoverHsl,
    "--popover-foreground": theme.popoverForegroundHsl,
  };

  if (theme.backgroundPattern) {
    themeStyles.background = theme.backgroundPattern;
  }

  return (
    <div
      className="flex min-h-screen flex-col bg-background text-foreground"
      style={themeStyles}
    >
      <DemoBanner />
      <BrandedHeader currentStep={currentStep} totalSteps={totalSteps} />
      <div className="flex flex-1 flex-col">{children}</div>
      <BrandedFooter />
    </div>
  );
};
