import "../index.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Friedemann Webdesign | Lokal, Modern, Persönlich",
  description:
    "Persönliches Webdesign für Betriebe in Wahrenholz und Umgebung. Moderne Websites, klare Absprachen und Betreuung direkt durch Till Friedemann.",
  metadataBase: new URL("https://www.friedemann-webdesign.de"),
  icons: {
    icon: "/logo-icon.webp",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className="relative">
      <body className={`${inter.className} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
