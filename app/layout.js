import './globals.css';
import { Inter } from 'next/font/google';

// Professional font loading
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: 'AI Smart Quote Estimator | Global B2B Pricing Engine',
    template: '%s | AI Quote Estimator'
  },
  description: 'Enterprise-grade valuation engine for 50+ service industries. Generate professional B2B quotes in seconds with AI-driven pricing logic.',
  keywords: ['SaaS', 'B2B Estimator', 'Pricing Engine', 'Quote Generator', 'Solopreneur Tools'],
  authors: [{ name: 'SaaS Architect' }],
  icons: {
    icon: '/favicon.ico', // Standard favicon
    shortcut: '/icon.png', // Large icon
    apple: '/apple-icon.png', // iOS home screen icon
  },
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-zinc-50 antialiased`}>
        {children}
      </body>
    </html>
  );
}