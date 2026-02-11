"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { BrandTheme } from "@/lib/brand-themes";

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface BrandThemeContextValue {
  /** The currently selected brand theme, or `null` for the default look. */
  theme: BrandTheme | null;
  /** Replace the active brand theme. Pass `null` to revert to defaults. */
  setTheme: (theme: BrandTheme | null) => void;
}

const BrandThemeContext = createContext<BrandThemeContextValue | undefined>(
  undefined,
);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

interface BrandThemeProviderProps {
  children: ReactNode;
  /** Optional initial theme (defaults to `null` / no branding). */
  initialTheme?: BrandTheme | null;
}

/**
 * Provides brand-theme state to the component tree.
 *
 * Wrap the registration page (or any subtree that needs theming) with this
 * provider so descendants can read/update the active theme via
 * `useBrandTheme()`.
 */
export const BrandThemeProvider = ({
  children,
  initialTheme = null,
}: BrandThemeProviderProps) => {
  const [theme, setTheme] = useState<BrandTheme | null>(initialTheme);

  return (
    <BrandThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </BrandThemeContext.Provider>
  );
};

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Access the current brand theme and its setter.
 *
 * @throws If called outside of a `<BrandThemeProvider>`.
 *
 * @example
 * ```tsx
 * const { theme, setTheme } = useBrandTheme();
 * ```
 */
export const useBrandTheme = (): BrandThemeContextValue => {
  const ctx = useContext(BrandThemeContext);
  if (ctx === undefined) {
    throw new Error("useBrandTheme must be used within a <BrandThemeProvider>");
  }
  return ctx;
};
