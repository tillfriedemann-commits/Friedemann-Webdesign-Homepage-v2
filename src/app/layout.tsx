import '../index.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Friedemann Webdesign | Lokal, Modern, Persönlich',
  description: 'Dein lokaler Ansprechpartner für modernes Webdesign.',
  icons: {
    icon: '/logo-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className={`${inter.className} font-sans antialiased text-slate-900 bg-white`}>
        {children}
      </body>
    </html>
  );
}
