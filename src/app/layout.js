import { Analytics } from '@vercel/analytics/next';

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
