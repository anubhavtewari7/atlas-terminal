import "../globals.css";

export const metadata = {
  title: "NAUTILUS -- Supply Chain Intelligence",
  description: "Real-time sourcing intelligence, tariff data, and geopolitical risk for procurement professionals. Know your supply chain before it fails you.",
  metadataBase: new URL('https://atlas-terminal-tau.vercel.app'),
  openGraph: {
    title: "NAUTILUS -- Supply Chain Intelligence",
    description: "Real-time sourcing intelligence, tariff data, and geopolitical risk for procurement professionals. Know your supply chain before it fails you.",
    url: "https://atlas-terminal-tau.vercel.app/terminal",
    siteName: "NAUTILUS Terminal",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NAUTILUS Terminal -- Supply Chain Intelligence HUD",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NAUTILUS -- Supply Chain Intelligence",
    description: "Real-time sourcing intelligence, tariff data, and geopolitical risk -- built for procurement professionals who can't afford surprises.",
    images: ["/og-image.png"],
  },
};

export default function TerminalLayout({ children }) {
  return (
    <div style={{ overflow: 'hidden', height: '100dvh' }}>
      {children}
    </div>
  );
}
