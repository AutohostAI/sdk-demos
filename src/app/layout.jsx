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
        {/* <header className="flex items-center justify-between h-16 px-4 md:px-6 border-b sticky top-0 bg-white hidden sm:block">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold"
            prefetch={false}
          >
            <MountainIcon className="w-12 h-12" />
            <span className="sr-only">Acme Inc</span>
          </Link>
        </header> */}
        {children}
      </body>
      {/* Production */}
      {/* <Script src={`https://sdk.autohost.ai/dist/AutohostSDK.v3.bundle.js`} /> */}

      {/* Nightly Build */}
      <Script
        src={`https://sdk.autohost.ca/dist/AutohostSDK.v3-beta.bundle.js`}
      />
    </html>
  );
}
