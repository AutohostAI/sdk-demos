import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Autohost SDK Demo - Guest Portal using iframe',
  description: 'Demo application showcasing the Autohost SDK Guest Portal using iframe.',
  authors: [{ name: 'Autohost' }],
  robots: 'noindex, nofollow',
}

export default function RegistrationEmbedLayout({ children }: { children: React.ReactNode }) {
  return children;
}
