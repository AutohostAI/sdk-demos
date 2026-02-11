import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Waits for a specified number of milliseconds.
 * Used to give the Autohost SDK script (loaded in layout.jsx) time to
 * initialize on `window.AutohostSDK` before calling SDK methods.
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise<void>}
 */
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
