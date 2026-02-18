import type { Category, CategoryMeta } from "../types"

export const CATEGORY_META: readonly CategoryMeta[] = [
  {
    id: "file-extension",
    label: "ファイル拡張子",
    icon: "\u{1F4C4}",
    color: "#FF6B6B",
    bgColor: "#FFF0F0",
  },
  {
    id: "programming-basics",
    label: "プログラミング基礎",
    icon: "\u{1F4BB}",
    color: "#4ECDC4",
    bgColor: "#F0FFFE",
  },
  {
    id: "web-technology",
    label: "Web技術",
    icon: "\u{1F310}",
    color: "#45B7D1",
    bgColor: "#F0F8FF",
  },
  {
    id: "ai-ml",
    label: "AI・機械学習",
    icon: "\u{1F916}",
    color: "#96CEB4",
    bgColor: "#F0FFF4",
  },
  {
    id: "dev-tools",
    label: "開発ツール",
    icon: "\u{1F527}",
    color: "#F4A460",
    bgColor: "#FFF8F0",
  },
  {
    id: "network",
    label: "ネットワーク",
    icon: "\u{1F50C}",
    color: "#DDA0DD",
    bgColor: "#FDF0FF",
  },
  {
    id: "database",
    label: "データベース",
    icon: "\u{1F5C4}\uFE0F",
    color: "#FF8C42",
    bgColor: "#FFF5EE",
  },
] as const

export const getCategoryMeta = (categoryId: Category): CategoryMeta => {
  const meta = CATEGORY_META.find((c) => c.id === categoryId)
  if (!meta) {
    throw new Error(`Unknown category: ${categoryId}`)
  }
  return meta
}
