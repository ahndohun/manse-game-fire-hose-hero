import type { Metadata, Viewport } from "next";
import { GAME_CONFIG } from "./game-config";
import "./globals.css";

export const metadata: Metadata = {
  title: `${GAME_CONFIG.title.en} · ${GAME_CONFIG.title.ko}`,
  description: GAME_CONFIG.summary.en,
  openGraph: {
    title: `${GAME_CONFIG.title.en} · ${GAME_CONFIG.title.ko}`,
    description: GAME_CONFIG.summary.en,
    images: [{ url: "/thumbnail.png", width: 1200, height: 630 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#171916",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={GAME_CONFIG.defaultLocale}>
      <body>{children}</body>
    </html>
  );
}
