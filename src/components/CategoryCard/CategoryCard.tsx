import { Link } from "react-router-dom"
import type { CategoryMeta } from "../../types"
import { ProgressBar } from "../ProgressBar/ProgressBar"
import styles from "./CategoryCard.module.css"

interface CategoryCardProps {
  readonly meta: CategoryMeta
  readonly totalTerms: number
  readonly masteredTerms: number
}

export const CategoryCard = ({
  meta,
  totalTerms,
  masteredTerms,
}: CategoryCardProps) => (
  <Link
    to={`/terms?category=${meta.id}`}
    className={styles.card}
    style={{
      backgroundColor: meta.bgColor,
      borderColor: `${meta.color}30`,
    }}
  >
    <div className={styles.top}>
      <span className={styles.icon}>{meta.icon}</span>
      <div className={styles.info}>
        <p className={styles.label} style={{ color: meta.color }}>
          {meta.label}
        </p>
        <p className={styles.termCount}>{totalTerms} 語</p>
      </div>
    </div>
    <ProgressBar current={masteredTerms} total={totalTerms} size="small" showLabel={false} />
  </Link>
)
