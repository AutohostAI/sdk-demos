import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Autohost SDK Demo - Guest Portal',
  description: 'Demo application showcasing the Autohost SDK Guest Portal components and verification results.',
  authors: [{ name: 'Autohost' }],
  robots: 'noindex, nofollow',
}

export default function RegistrationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
