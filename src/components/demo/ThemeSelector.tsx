/**
 * ThemeSelector — Brand Theme Picker for Demo Purposes
 *
 * Dropdown selector that lets users preview different property brand themes
 * on the guest registration portal. Each option displays color preview swatches
 * alongside the theme name.
 *
 * Reads and writes the active theme via the BrandThemeContext.
 *
 * @demo This component is for demonstration purposes only and would not appear
 * in a production guest-facing portal.
 */
"use client";

import { brandThemes } from "@/lib/brand-themes";
import { useBrandTheme } from "@/context/BrandThemeContext";
import { Paintbrush } from "lucide-react";

export const ThemeSelector = () => {
  const { theme, setTheme } = useBrandTheme();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    if (selectedId === "none") {
      setTheme(null);
      return;
    }
    const selected = brandThemes.find((t) => t.id === selectedId) ?? null;
    setTheme(selected);
  };

  return (
    <div className="mx-auto w-full max-w-md px-4 md:px-6">
      <div className="rounded-lg border border-amber-200 bg-amber-50/60 p-4">
        <div className="mb-2 flex items-center gap-2">
          <Paintbrush className="h-4 w-4 text-amber-600" />
          <span className="text-sm font-medium text-amber-900">
            Brand Theme Preview
          </span>
        </div>

        <select
          value={theme?.id ?? "none"}
          onChange={handleChange}
          className="mb-2 w-full rounded-md border border-amber-200 bg-white px-3 py-2 text-sm shadow-sm transition-colors focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
        >
          <option value="none">No Branding</option>
          {brandThemes.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>

        {/* Color swatches for all themes */}
        <div className="space-y-1.5">
          {brandThemes.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t)}
              className={`flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-left text-xs transition-colors ${
                theme?.id === t.id
                  ? "bg-amber-100 font-medium text-amber-900"
                  : "text-amber-700 hover:bg-amber-100/50"
              }`}
            >
              <div className="flex shrink-0 gap-1">
                <span
                  className="inline-block h-3 w-3 rounded-full border border-black/10"
                  style={{ background: t.primaryHsl }}
                />
                <span
                  className="inline-block h-3 w-3 rounded-full border border-black/10"
                  style={{ background: t.accentHsl }}
                />
                <span
                  className="inline-block h-3 w-3 rounded-full border border-black/10"
                  style={{ background: t.backgroundHsl }}
                />
              </div>
              <span className="truncate">{t.name}</span>
            </button>
          ))}
        </div>

        <p className="mt-2 text-center text-[10px] tracking-wide text-amber-500">
          For demo purposes only
        </p>
      </div>
    </div>
  );
};
