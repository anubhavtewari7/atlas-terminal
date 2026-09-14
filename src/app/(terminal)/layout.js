import "../globals.css";

export const metadata = {
  title: "NAUTILUS -- Supply Chain Intelligence",
  description: "Real-time sourcing intelligence, tariff data, and geopolitical risk for procurement professionals. Know your supply chain before it fails you.",
  metadataBase: new URL('https://nautilus-terminal.vercel.app'),
  openGraph: {
    title: "NAUTILUS -- Supply Chain Intelligence",
    description: "Real-time sourcing intelligence, tariff data, and geopolitical risk for procurement professionals. Know your supply chain before it fails you.",
    url: "https://nautilus-terminal.vercel.app/terminal",
    siteName: "NAUTILUS Terminal",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NAUTILUS -- Supply Chain Intelligence",
    description: "Real-time sourcing intelligence, tariff data, and geopolitical risk -- built for procurement professionals who can't afford surprises.",
  },
};

export default function TerminalLayout({ children }) {
  return (
    <div style={{ overflow: 'hidden', height: '100dvh' }}>
      {children}
    </div>
  );
}
