import type { Metadata, Viewport } from "next";
import { GAME_CONFIG } from "./game-config";
import "./globals.css";

export const metadata: Metadata = {
  title: GAME_CONFIG.title,
  description: GAME_CONFIG.summary,
  openGraph: {
    title: GAME_CONFIG.title,
    description: GAME_CONFIG.summary,
    images: [{ url: "/thumbnail.png", width: 1200, height: 630 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#10162b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={GAME_CONFIG.locale}>
      <body>{children}</body>
    </html>
  );
}
