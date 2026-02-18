import { useCallback, useMemo, useState } from "react"
import type { Category, MasteryLevel, ProgressData, TermProgress } from "../types"
import { TERMS } from "../data/terms"
import { loadProgress, saveProgress } from "../utils/storage"

interface ProgressStats {
  readonly total: number
  readonly unlearned: number
  readonly learning: number
  readonly mastered: number
}

interface CategoryStats {
  readonly total: number
  readonly mastered: number
}

interface UseProgressReturn {
  readonly progress: ProgressData
  readonly getLevel: (termId: string) => MasteryLevel
  readonly updateLevel: (termId: string, level: MasteryLevel) => void
  readonly getStats: () => ProgressStats
  readonly getCategoryStats: (category: Category) => CategoryStats
}

export const useProgress = (): UseProgressReturn => {
  const [progress, setProgress] = useState<ProgressData>(loadProgress)

  const getLevel = useCallback(
    (termId: string): MasteryLevel => progress[termId]?.level ?? "unlearned",
    [progress]
  )

  const updateLevel = useCallback(
    (termId: string, level: MasteryLevel): void => {
      setProgress((prev) => {
        const updated: ProgressData = {
          ...prev,
          [termId]: {
            termId,
            level,
            lastStudied: new Date().toISOString(),
          } satisfies TermProgress,
        }
        saveProgress(updated)
        return updated
      })
    },
    []
  )

  const getStats = useCallback((): ProgressStats => {
    const total = TERMS.length
    let mastered = 0
    let learning = 0

    for (const term of TERMS) {
      const level = progress[term.id]?.level
      if (level === "mastered") mastered++
      else if (level === "learning") learning++
    }

    return {
      total,
      unlearned: total - mastered - learning,
      learning,
      mastered,
    }
  }, [progress])

  const getCategoryStats = useCallback(
    (category: Category): CategoryStats => {
      const categoryTerms = TERMS.filter((t) => t.category === category)
      const mastered = categoryTerms.filter(
        (t) => progress[t.id]?.level === "mastered"
      ).length

      return { total: categoryTerms.length, mastered }
    },
    [progress]
  )

  return useMemo(
    () => ({ progress, getLevel, updateLevel, getStats, getCategoryStats }),
    [progress, getLevel, updateLevel, getStats, getCategoryStats]
  )
}
