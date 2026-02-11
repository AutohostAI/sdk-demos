/**
 * Landing Page
 *
 * Links to the three SDK demo experiences:
 * 1. Guest Portal SDK Demo — custom verification UI built with SDK components
 * 2. Guest Portal Iframe Demo — embed the hosted Guest Portal in an iframe
 * 3. PMS Admin Dashboard Demo — admin-side ReservationResults component
 */
import type { Metadata } from "next";
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Autohost SDK Demos | Guest Portal & Admin Dashboard Examples',
  description: 'Explore demo applications showcasing Autohost SDK capabilities',
};

export default function Home() {
  const demos = [
    {
      title: 'Guest Portal SDK Demo',
      description: 'Experience our customizable verification UI components built with the Autohost SDK.',
      href: '/registration',
      gradient: 'from-blue-600 to-cyan-500',
      icon: '🔐'
    },
    {
      title: 'Guest Portal Iframe Demo',
      description: 'See how easily you can embed the complete Guest Portal experience in your application.',
      href: '/registration-embed',
      gradient: 'from-purple-600 to-pink-500',
      icon: '🖼️'
    },
    {
      title: 'PMS Admin Dashboard Demo',
      description: 'Explore our powerful admin dashboard components for managing verifications and screenings.',
      href: '/dashboard',
      gradient: 'from-green-600 to-emerald-500',
      icon: '📊'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            Autohost SDK Demos
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore our suite of demo applications showcasing the power and flexibility of the Autohost SDK.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {demos.map((demo) => (
            <Link
              key={demo.href}
              href={demo.href}
              className="group block p-6 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-gray-600
                        transition-all duration-300 hover:shadow-xl hover:shadow-gray-900/30 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{demo.icon}</span>
                <div className={`h-8 w-8 rounded-full bg-gradient-to-br ${demo.gradient}
                              opacity-75 group-hover:opacity-100 transition-opacity`} />
              </div>
              <h2 className="text-xl font-semibold mb-3">{demo.title}</h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                {demo.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-20 text-center text-gray-400">
          <p className="text-sm flex items-center justify-center gap-4">
            <span>Built with Autohost SDK</span>
            <span>•</span>
            <a
              href="https://docs.autohost.ai/docs/sdk/sdk-intro"
              className="underline hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Documentation
            </a>
            <span>•</span>
            <a
              href="https://github.com/AutohostAI/"
              className="hover:text-white transition-colors flex items-center gap-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-lg">★</span> GitHub
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
