import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Waits for a specified number of milliseconds.
 * Used to give the Autohost SDK script (loaded in layout.tsx) time to
 * initialize on `window.AutohostSDK` before calling SDK methods.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
