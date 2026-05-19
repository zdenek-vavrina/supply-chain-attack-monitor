import type {Metadata} from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });

export const metadata: Metadata = {
  title: '0 Days Since',
  description: 'Tracker for npm and PyPI supply chain attacks.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${space.variable}`}>
      <body className="font-sans antialiased bg-zinc-950 text-zinc-100 flex flex-col min-h-screen overflow-x-hidden" suppressHydrationWarning>{children}</body>
    </html>
  );
}
