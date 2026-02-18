import { useCallback, useEffect } from "react"
import type { Term } from "../../types"
import { getCategoryMeta } from "../../styles/colors"
import styles from "./Flashcard.module.css"

interface FlashcardProps {
  readonly term: Term
  readonly isFlipped: boolean
  readonly onFlip: () => void
  readonly onKnown: () => void
  readonly onUnknown: () => void
}

export const Flashcard = ({
  term,
  isFlipped,
  onFlip,
  onKnown,
  onUnknown,
}: FlashcardProps) => {
  const meta = getCategoryMeta(term.category)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault()
        onFlip()
      } else if (e.key === "ArrowRight") {
        onKnown()
      } else if (e.key === "ArrowLeft") {
        onUnknown()
      }
    },
    [onFlip, onKnown, onUnknown]
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  return (
    <div>
      <div
        className={styles.scene}
        onClick={onFlip}
        onKeyDown={(e) => {
          if (e.key === "Enter") onFlip()
        }}
        role="button"
        tabIndex={0}
        aria-label={isFlipped ? "説明を表示中" : "用語名を表示中"}
      >
        <div className={`${styles.card} ${isFlipped ? styles.cardFlipped : ""}`}>
          <div className={`${styles.face} ${styles.front}`}>
            <span
              className={styles.categoryBadge}
              style={{ backgroundColor: meta.bgColor, color: meta.color }}
            >
              {meta.icon} {meta.label}
            </span>
            <p className={styles.termName}>{term.name}</p>
            <p className={styles.termReading}>{term.reading}</p>
            <p className={styles.flipHint}>タップで意味を表示</p>
          </div>
          <div className={`${styles.face} ${styles.back}`}>
            <p className={styles.termDescription}>{term.description}</p>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.btnUnknown} onClick={onUnknown}>
          もう一回 ↻
        </button>
        <button type="button" className={styles.btnKnown} onClick={onKnown}>
          覚えた！ ✓
        </button>
      </div>

      <div className={styles.keyboardHint}>
        <span>
          <kbd>Space</kbd> 反転
        </span>
        <span>
          <kbd>←</kbd> もう一回
        </span>
        <span>
          <kbd>→</kbd> 覚えた
        </span>
      </div>
    </div>
  )
}

interface FlashcardCompleteProps {
  readonly knownCount: number
  readonly unknownCount: number
  readonly onRestart: () => void
}

export const FlashcardComplete = ({
  knownCount,
  unknownCount,
  onRestart,
}: FlashcardCompleteProps) => (
  <div className={styles.complete}>
    <div className={styles.completeIcon}>🎉</div>
    <p className={styles.completeTitle}>学習完了！</p>
    <div className={styles.resultRow}>
      <div className={styles.resultItem}>
        <span className={styles.resultNumber} style={{ color: "#4ECDC4" }}>
          {knownCount}
        </span>
        <span className={styles.resultLabel}>覚えた</span>
      </div>
      <div className={styles.resultItem}>
        <span className={styles.resultNumber} style={{ color: "#FF6B6B" }}>
          {unknownCount}
        </span>
        <span className={styles.resultLabel}>もう一回</span>
      </div>
    </div>
    <button type="button" className={styles.btnRestart} onClick={onRestart}>
      もう一度学習する
    </button>
  </div>
)
