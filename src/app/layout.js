import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: 'ATLAS Terminal -- Supply Chain Intelligence',
  description: 'Real-time sourcing intelligence, tariff data, and geopolitical risk for procurement professionals. Know your supply chain before it fails you.',
  metadataBase: new URL('https://atlas-terminal-tau.vercel.app'),
  openGraph: {
    title: 'ATLAS Terminal -- Supply Chain Intelligence',
    description: 'Real-time sourcing intelligence, tariff data, and geopolitical risk for procurement professionals. Know your supply chain before it fails you.',
    url: 'https://atlas-terminal-tau.vercel.app',
    siteName: 'ATLAS Terminal',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ATLAS Terminal -- Supply Chain Intelligence',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ATLAS Terminal -- Supply Chain Intelligence',
    description: 'Real-time sourcing intelligence, tariff data, and geopolitical risk -- built for procurement professionals who can\'t afford surprises.',
    images: ['/og-image.png'],
  },
};

// Root layout — minimal shell. Each route group applies its own CSS.
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
