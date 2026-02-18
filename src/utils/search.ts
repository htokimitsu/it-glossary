import type { Category, MasteryLevel, ProgressData, Term } from "../types"

/**
 * Convert katakana to hiragana for normalized comparison.
 */
const toHiragana = (str: string): string =>
  str.replace(/[\u30A1-\u30F6]/g, (ch) =>
    String.fromCharCode(ch.charCodeAt(0) - 0x60)
  )

const normalize = (str: string): string => toHiragana(str.toLowerCase())

export interface SearchFilters {
  readonly query: string
  readonly categories: readonly Category[]
  readonly masteryLevels: readonly MasteryLevel[]
}

export const filterTerms = (
  terms: readonly Term[],
  filters: SearchFilters,
  progress: ProgressData
): readonly Term[] => {
  const { query, categories, masteryLevels } = filters

  const keywords = query
    .trim()
    .split(/\s+/)
    .filter((k) => k.length > 0)
    .map(normalize)

  return terms.filter((term) => {
    // Category filter
    if (categories.length > 0 && !categories.includes(term.category)) {
      return false
    }

    // Mastery level filter
    if (masteryLevels.length > 0) {
      const level = progress[term.id]?.level ?? "unlearned"
      if (!masteryLevels.includes(level)) {
        return false
      }
    }

    // Keyword search (AND)
    if (keywords.length > 0) {
      const searchTarget = normalize(
        [term.name, term.reading, term.description, ...term.tags].join(" ")
      )
      return keywords.every((kw) => searchTarget.includes(kw))
    }

    return true
  })
}
