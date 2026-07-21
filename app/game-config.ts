export type GameLocale = "ko" | "en";

export const GAME_CONFIG = {
  slug: "fire-hose-hero",
  title: {
    ko: "소방수 물줄기",
    en: "Fire Hose Hero",
  },
  summary: {
    ko: "소방 호스를 조준해 모든 불꽃을 끄고 하루를 구하세요.",
    en: "Aim your fire hose and put out every flame to save the day.",
  },
  hero: {
    path: "/packs/fire-hose-hero/assets/images/fire-hose-hero.png",
    alt: {
      ko: "소방서 마당에서 호스 물줄기가 작은 불꽃들을 향해 시원하게 뻗어가는 그림",
      en: "A fire hose sends a sweeping blue stream toward small flames in a fire-station courtyard",
    },
  },
  creator: "Manse",
  sourceUrl: "https://github.com/ahndohun/manse-game-fire-hose-hero",
  defaultLocale: "en",
} as const;
