export type PlaceholderChokepoint = {
  id: string;
  slug: string;
  name: string;
};

export const appName = "Squee Radar";

export const placeholderChokepoints = [
  { id: "hormuz", slug: "hormuz", name: "Strait of Hormuz" },
  { id: "red-sea", slug: "red-sea", name: "Bab el-Mandeb / Red Sea" },
  { id: "suez", slug: "suez", name: "Suez Canal / SUMED Pipeline" },
  { id: "malacca", slug: "malacca", name: "Strait of Malacca / Singapore Strait" },
  { id: "panama", slug: "panama", name: "Panama Canal" },
  { id: "turkish", slug: "turkish", name: "Turkish Straits" },
] as const satisfies readonly PlaceholderChokepoint[];
