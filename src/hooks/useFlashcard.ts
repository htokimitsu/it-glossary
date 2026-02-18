import { useCallback, useMemo, useState } from "react"
import type { MasteryLevel, Term } from "../types"

interface FlashcardResults {
  readonly known: number
  readonly unknown: number
}

interface UseFlashcardReturn {
  readonly currentTerm: Term | null
  readonly currentIndex: number
  readonly totalCount: number
  readonly isFlipped: boolean
  readonly flip: () => void
  readonly markAsKnown: () => void
  readonly markAsUnknown: () => void
  readonly isComplete: boolean
  readonly results: FlashcardResults
  readonly suggestedLevel: MasteryLevel
}

export const useFlashcard = (
  terms: readonly Term[],
  onUpdateLevel: (termId: string, level: MasteryLevel) => void
): UseFlashcardReturn => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [known, setKnown] = useState(0)
  const [unknown, setUnknown] = useState(0)

  const totalCount = terms.length
  const isComplete = currentIndex >= totalCount
  const currentTerm = isComplete ? null : (terms[currentIndex] ?? null)

  const flip = useCallback(() => {
    setIsFlipped((prev) => !prev)
  }, [])

  const advance = useCallback(() => {
    setCurrentIndex((prev) => prev + 1)
    setIsFlipped(false)
  }, [])

  const markAsKnown = useCallback(() => {
    if (currentTerm) {
      onUpdateLevel(currentTerm.id, "mastered")
      setKnown((prev) => prev + 1)
      advance()
    }
  }, [currentTerm, onUpdateLevel, advance])

  const markAsUnknown = useCallback(() => {
    if (currentTerm) {
      onUpdateLevel(currentTerm.id, "learning")
      setUnknown((prev) => prev + 1)
      advance()
    }
  }, [currentTerm, onUpdateLevel, advance])

  const suggestedLevel: MasteryLevel = isComplete
    ? known > unknown
      ? "mastered"
      : "learning"
    : "unlearned"

  return useMemo(
    () => ({
      currentTerm,
      currentIndex,
      totalCount,
      isFlipped,
      flip,
      markAsKnown,
      markAsUnknown,
      isComplete,
      results: { known, unknown },
      suggestedLevel,
    }),
    [
      currentTerm,
      currentIndex,
      totalCount,
      isFlipped,
      flip,
      markAsKnown,
      markAsUnknown,
      isComplete,
      known,
      unknown,
      suggestedLevel,
    ]
  )
}
