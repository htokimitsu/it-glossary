import { useState } from "react"
import type { MasteryLevel, Term } from "../../types"
import { getCategoryMeta } from "../../styles/colors"
import styles from "./TermCard.module.css"

interface TermCardProps {
  readonly term: Term
  readonly masteryLevel: MasteryLevel
}

const MASTERY_ICONS: Record<MasteryLevel, string> = {
  unlearned: "⬜",
  learning: "🟡",
  mastered: "✅",
}

export const TermCard = ({ term, masteryLevel }: TermCardProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const meta = getCategoryMeta(term.category)

  return (
    <div
      className={styles.card}
      onClick={() => setIsOpen((prev) => !prev)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          setIsOpen((prev) => !prev)
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className={styles.cardHeader}>
        <span
          className={styles.badge}
          style={{ backgroundColor: meta.bgColor, color: meta.color }}
        >
          {meta.icon} {meta.label}
        </span>
        <div className={styles.nameSection}>
          <p className={styles.name}>{term.name}</p>
          <p className={styles.reading}>{term.reading}</p>
        </div>
        <span className={styles.masteryIcon}>{MASTERY_ICONS[masteryLevel]}</span>
        <span
          className={`${styles.expandIcon} ${isOpen ? styles.expandIconOpen : ""}`}
        >
          ▼
        </span>
      </div>
      {isOpen && (
        <div className={styles.body}>
          <p className={styles.description}>{term.description}</p>
          {term.tags.length > 0 && (
            <div className={styles.tags}>
              {term.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
