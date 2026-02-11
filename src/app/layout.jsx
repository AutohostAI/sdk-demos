/**
 * Root Layout
 *
 * Loads the Autohost SDK script globally so every demo page can access
 * `window.AutohostSDK`. The script is loaded via Next.js <Script> to
 * ensure non-blocking, deferred loading.
 */
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata = {
  title: "Autohost SDK Demo",
  description: "Collection of demos for the Autohost SDK",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
      {/* Production — stable release of the SDK */}
      {/* <Script src={`https://sdk.autohost.ai/dist/AutohostSDK.v3.bundle.js`} /> */}

      {/* Nightly — pre-release build used for testing new SDK features */}
      <Script
        src={`https://sdk.autohost.ca/dist/AutohostSDK.v3-beta.bundle.js`}
      />
    </html>
  );
}
