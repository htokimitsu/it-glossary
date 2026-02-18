import { useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import type { Category } from "../../types"
import { TERMS } from "../../data/terms"
import { CATEGORY_META } from "../../styles/colors"
import { useProgress } from "../../hooks/useProgress"
import { useFlashcard } from "../../hooks/useFlashcard"
import { FilterChips } from "../../components/FilterChips/FilterChips"
import { Flashcard, FlashcardComplete } from "../../components/Flashcard/Flashcard"
import styles from "./Study.module.css"
import flashcardStyles from "../../components/Flashcard/Flashcard.module.css"

const CATEGORY_OPTIONS = CATEGORY_META.map((c) => ({
  value: c.id,
  label: `${c.icon} ${c.label}`,
}))

const shuffleArray = <T,>(arr: readonly T[]): readonly T[] => {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = shuffled[i]
    shuffled[i] = shuffled[j]!
    shuffled[j] = temp!
  }
  return shuffled
}

const StudySession = ({
  terms,
}: {
  readonly terms: readonly import("../../types").Term[]
}) => {
  const { updateLevel } = useProgress()
  const {
    currentTerm,
    currentIndex,
    totalCount,
    isFlipped,
    flip,
    markAsKnown,
    markAsUnknown,
    isComplete,
    results,
  } = useFlashcard(terms, updateLevel)

  if (isComplete) {
    return (
      <FlashcardComplete
        knownCount={results.known}
        unknownCount={results.unknown}
        onRestart={() => window.location.reload()}
      />
    )
  }

  if (!currentTerm) return null

  return (
    <div>
      <div className={flashcardStyles.progress}>
        <span className={flashcardStyles.progressCurrent}>{currentIndex + 1}</span> /{" "}
        {totalCount}
      </div>
      <Flashcard
        term={currentTerm}
        isFlipped={isFlipped}
        onFlip={flip}
        onKnown={markAsKnown}
        onUnknown={markAsUnknown}
      />
    </div>
  )
}

export const Study = () => {
  const [searchParams] = useSearchParams()
  const categoryParam = searchParams.get("category")
  const initialCategories = categoryParam
    ? (categoryParam.split(",") as Category[])
    : []

  const [selectedCategories, setSelectedCategories] =
    useState<readonly Category[]>(initialCategories)
  const [isStarted, setIsStarted] = useState(false)

  const filteredTerms = useMemo(() => {
    const base =
      selectedCategories.length > 0
        ? TERMS.filter((t) => selectedCategories.includes(t.category))
        : TERMS
    return shuffleArray(base)
  }, [selectedCategories])

  if (isStarted && filteredTerms.length > 0) {
    return (
      <div className={styles.container}>
        <StudySession terms={filteredTerms} />
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>単語帳学習</h1>
      </div>

      <div className={styles.categorySelect}>
        <span className={styles.selectLabel}>学習するカテゴリを選択</span>
        <FilterChips
          options={CATEGORY_OPTIONS}
          selected={selectedCategories}
          onChange={setSelectedCategories}
        />
      </div>

      <p className={styles.termCount}>
        <span className={styles.termCountNum}>{filteredTerms.length}</span> 語を学習
      </p>

      {filteredTerms.length > 0 ? (
        <button
          type="button"
          className={styles.startButton}
          onClick={() => setIsStarted(true)}
        >
          学習スタート 🚀
        </button>
      ) : (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>📝</div>
          <p>カテゴリを選択してください</p>
        </div>
      )}
    </div>
  )
}
