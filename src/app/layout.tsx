import '../index.css';
import { Inter } from 'next/font/google';
import { LazyMotion, domAnimation } from 'motion/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Friedemann Webdesign | Lokal, Modern, Persönlich',
  description: 'Dein lokaler Ansprechpartner für modernes Webdesign.',
  icons: {
    icon: '/logo-icon.webp',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className="relative">
      <body className={`${inter.className} font-sans antialiased text-slate-900 bg-white relative`} suppressHydrationWarning>
        <LazyMotion features={domAnimation}>
          {children}
        </LazyMotion>
      </body>
    </html>
  );
}
