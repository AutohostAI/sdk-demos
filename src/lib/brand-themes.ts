/**
 * Brand theme definitions for the guest portal demo.
 *
 * Each theme provides a full set of HSL colour tokens that map 1-to-1 with the
 * CSS custom properties declared in globals.css.  Values use the `hsl(…)` wrapper
 * format expected by Tailwind CSS v4.
 */

export interface BrandTheme {
  id: string;
  name: string;
  description: string;
  propertyName: string;
  /** Lucide icon name — e.g. "Hotel", "Waves", "Building2", "Trees" */
  logoIcon: string;

  /* ---- colour tokens (hsl strings) ---- */
  primaryHsl: string;
  primaryForegroundHsl: string;
  accentHsl: string;
  accentForegroundHsl: string;
  backgroundHsl: string;
  foregroundHsl: string;
  cardHsl: string;
  cardForegroundHsl: string;
  borderHsl: string;
  mutedHsl: string;
  mutedForegroundHsl: string;
  secondaryHsl: string;
  secondaryForegroundHsl: string;

  /* ---- additional CSS token overrides ---- */
  inputHsl: string;
  ringHsl: string;
  popoverHsl: string;
  popoverForegroundHsl: string;

  /* ---- optional branding extras ---- */
  headerForegroundHsl?: string;
  headerGradient?: string;
  /** CSS `background` shorthand for a decorative page background (gradients, patterns, etc.). */
  backgroundPattern?: string;
  checkInTime?: string;
  contactPhone?: string;
  address?: string;
}

// ---------------------------------------------------------------------------
// Preset themes
// ---------------------------------------------------------------------------

export const noneTheme: BrandTheme = {
  id: "none",
  name: "No Branding",
  description: "Default look — no property branding applied.",
  propertyName: "Guest Portal",
  logoIcon: "Home",
  primaryHsl: "hsl(222.2 47.4% 11.2%)",
  primaryForegroundHsl: "hsl(210 40% 98%)",
  accentHsl: "hsl(210 40% 96.1%)",
  accentForegroundHsl: "hsl(222.2 47.4% 11.2%)",
  backgroundHsl: "hsl(0 0% 100%)",
  foregroundHsl: "hsl(222.2 84% 4.9%)",
  cardHsl: "hsl(0 0% 100%)",
  cardForegroundHsl: "hsl(222.2 84% 4.9%)",
  borderHsl: "hsl(214.3 31.8% 91.4%)",
  mutedHsl: "hsl(210 40% 96.1%)",
  mutedForegroundHsl: "hsl(215.4 16.3% 46.9%)",
  secondaryHsl: "hsl(210 40% 96.1%)",
  secondaryForegroundHsl: "hsl(222.2 47.4% 11.2%)",
  inputHsl: "hsl(214.3 31.8% 91.4%)",
  ringHsl: "hsl(222.2 84% 4.9%)",
  popoverHsl: "hsl(0 0% 100%)",
  popoverForegroundHsl: "hsl(222.2 84% 4.9%)",
  headerForegroundHsl: "hsl(210 40% 98%)",
};

const grandAzureTheme: BrandTheme = {
  id: "grand-azure",
  name: "Grand Azure Hotel & Spa",
  description: "Deep navy and gold — timeless luxury.",
  propertyName: "Grand Azure Hotel & Spa",
  logoIcon: "Hotel",
  primaryHsl: "hsl(221 45% 18%)",
  primaryForegroundHsl: "hsl(45 100% 97%)",
  accentHsl: "hsl(44 54% 54%)",
  accentForegroundHsl: "hsl(221 45% 15%)",
  backgroundHsl: "hsl(220 20% 97%)",
  foregroundHsl: "hsl(221 50% 11%)",
  cardHsl: "hsl(0 0% 100%)",
  cardForegroundHsl: "hsl(221 50% 11%)",
  borderHsl: "hsl(220 25% 88%)",
  mutedHsl: "hsl(220 20% 94%)",
  mutedForegroundHsl: "hsl(220 15% 45%)",
  secondaryHsl: "hsl(44 40% 93%)",
  secondaryForegroundHsl: "hsl(221 45% 18%)",
  inputHsl: "hsl(220 25% 88%)",
  ringHsl: "hsl(221 45% 18%)",
  popoverHsl: "hsl(0 0% 100%)",
  popoverForegroundHsl: "hsl(221 50% 11%)",
  headerForegroundHsl: "hsl(0 0% 100%)",
  headerGradient: "linear-gradient(135deg, hsl(221 45% 18%), hsl(221 55% 12%))",
  backgroundPattern:
    "radial-gradient(ellipse at top, hsl(220 30% 95%) 0%, hsl(220 20% 97%) 50%, transparent 70%), radial-gradient(ellipse at bottom right, hsl(44 30% 96%) 0%, transparent 50%)",
  checkInTime: "3:00 PM",
  contactPhone: "(555) 234-5678",
  address: "100 Azure Boulevard, Marina Bay, CA 90210",
};

const coastalResortTheme: BrandTheme = {
  id: "coastal-resort",
  name: "Coastal Beach Resort",
  description: "Ocean teal and sandy warmth — seaside relaxation.",
  propertyName: "Coastal Beach Resort",
  logoIcon: "Waves",
  primaryHsl: "hsl(182 80% 26%)",
  primaryForegroundHsl: "hsl(180 20% 98%)",
  accentHsl: "hsl(36 78% 60%)",
  accentForegroundHsl: "hsl(182 80% 15%)",
  backgroundHsl: "hsl(180 15% 97%)",
  foregroundHsl: "hsl(182 60% 10%)",
  cardHsl: "hsl(0 0% 100%)",
  cardForegroundHsl: "hsl(182 60% 10%)",
  borderHsl: "hsl(180 20% 88%)",
  mutedHsl: "hsl(180 15% 94%)",
  mutedForegroundHsl: "hsl(180 12% 45%)",
  secondaryHsl: "hsl(36 50% 93%)",
  secondaryForegroundHsl: "hsl(182 80% 26%)",
  inputHsl: "hsl(180 20% 88%)",
  ringHsl: "hsl(182 80% 26%)",
  popoverHsl: "hsl(0 0% 100%)",
  popoverForegroundHsl: "hsl(182 60% 10%)",
  headerForegroundHsl: "hsl(0 0% 100%)",
  headerGradient:
    "linear-gradient(135deg, hsl(182 80% 26%), hsl(185 75% 32%))",
  backgroundPattern:
    "linear-gradient(180deg, hsl(180 20% 95%) 0%, hsl(180 12% 96%) 40%, hsl(36 20% 97%) 100%)",
  checkInTime: "4:00 PM",
  contactPhone: "(555) 876-5432",
  address: "1 Ocean Drive, Seaside, FL 33139",
};

const urbanLoftTheme: BrandTheme = {
  id: "urban-loft",
  name: "Urban Loft Apartments",
  description: "Slate charcoal and burnt orange — modern minimalism.",
  propertyName: "Urban Loft Apartments",
  logoIcon: "Building2",
  primaryHsl: "hsl(193 9% 19%)",
  primaryForegroundHsl: "hsl(0 0% 98%)",
  accentHsl: "hsl(12 70% 61%)",
  accentForegroundHsl: "hsl(0 0% 100%)",
  backgroundHsl: "hsl(0 0% 97%)",
  foregroundHsl: "hsl(193 10% 10%)",
  cardHsl: "hsl(0 0% 100%)",
  cardForegroundHsl: "hsl(193 10% 10%)",
  borderHsl: "hsl(0 0% 88%)",
  mutedHsl: "hsl(0 0% 94%)",
  mutedForegroundHsl: "hsl(0 0% 45%)",
  secondaryHsl: "hsl(0 0% 94%)",
  secondaryForegroundHsl: "hsl(193 9% 19%)",
  inputHsl: "hsl(0 0% 88%)",
  ringHsl: "hsl(193 9% 19%)",
  popoverHsl: "hsl(0 0% 100%)",
  popoverForegroundHsl: "hsl(193 10% 10%)",
  headerForegroundHsl: "hsl(0 0% 100%)",
  headerGradient:
    "linear-gradient(135deg, hsl(193 9% 19%), hsl(200 12% 28%))",
  checkInTime: "2:00 PM",
  contactPhone: "(555) 901-2345",
  address: "750 Metropolitan Ave, Brooklyn, NY 11211",
};

const mountainLodgeTheme: BrandTheme = {
  id: "mountain-lodge",
  name: "Mountain Lodge Retreat",
  description: "Forest green and warm wood — rustic mountain charm.",
  propertyName: "Mountain Lodge Retreat",
  logoIcon: "Trees",
  primaryHsl: "hsl(96 57% 20%)",
  primaryForegroundHsl: "hsl(90 20% 98%)",
  accentHsl: "hsl(31 53% 64%)",
  accentForegroundHsl: "hsl(96 57% 15%)",
  backgroundHsl: "hsl(40 15% 97%)",
  foregroundHsl: "hsl(96 40% 10%)",
  cardHsl: "hsl(0 0% 100%)",
  cardForegroundHsl: "hsl(96 40% 10%)",
  borderHsl: "hsl(40 15% 88%)",
  mutedHsl: "hsl(40 12% 94%)",
  mutedForegroundHsl: "hsl(96 10% 45%)",
  secondaryHsl: "hsl(31 30% 93%)",
  secondaryForegroundHsl: "hsl(96 57% 20%)",
  inputHsl: "hsl(40 15% 88%)",
  ringHsl: "hsl(96 57% 20%)",
  popoverHsl: "hsl(0 0% 100%)",
  popoverForegroundHsl: "hsl(96 40% 10%)",
  headerForegroundHsl: "hsl(0 0% 100%)",
  headerGradient:
    "linear-gradient(135deg, hsl(96 57% 20%), hsl(140 45% 25%))",
  backgroundPattern:
    "linear-gradient(180deg, hsl(96 15% 94%) 0%, hsl(60 10% 96%) 50%, hsl(40 15% 97%) 100%)",
  checkInTime: "4:00 PM",
  contactPhone: "(555) 345-6789",
  address: "42 Timberline Road, Aspen, CO 81611",
};

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

/** All available brand themes (excludes the "none" fallback). */
export const brandThemes: BrandTheme[] = [
  grandAzureTheme,
  coastalResortTheme,
  urbanLoftTheme,
  mountainLodgeTheme,
];

/** Look up a brand theme by its `id`. Returns `undefined` when not found. */
export const getBrandTheme = (id: string): BrandTheme | undefined =>
  brandThemes.find((t) => t.id === id);
