import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Autohost SDK Demo - Admin Dashboard',
  description: 'Demo application showcasing the Autohost SDK Admin Dashboard components and verification results.',
  authors: [{ name: 'Autohost' }],
  robots: 'noindex, nofollow',
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
