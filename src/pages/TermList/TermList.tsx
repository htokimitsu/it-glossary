import { useMemo, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import type { Category, MasteryLevel } from "../../types"
import { TERMS } from "../../data/terms"
import { CATEGORY_META } from "../../styles/colors"
import { filterTerms } from "../../utils/search"
import { useProgress } from "../../hooks/useProgress"
import { SearchBar } from "../../components/SearchBar/SearchBar"
import { FilterChips } from "../../components/FilterChips/FilterChips"
import { TermCard } from "../../components/TermCard/TermCard"
import styles from "./TermList.module.css"

const CATEGORY_OPTIONS = CATEGORY_META.map((c) => ({
  value: c.id,
  label: `${c.icon} ${c.label}`,
}))

const MASTERY_OPTIONS: readonly { value: MasteryLevel; label: string }[] = [
  { value: "unlearned", label: "⬜ 未学習" },
  { value: "learning", label: "🟡 学習中" },
  { value: "mastered", label: "✅ 習得済み" },
]

export const TermList = () => {
  const [searchParams] = useSearchParams()
  const initialCategory = searchParams.get("category") as Category | null

  const [query, setQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<readonly Category[]>(
    initialCategory ? [initialCategory] : []
  )
  const [selectedLevels, setSelectedLevels] = useState<readonly MasteryLevel[]>([])

  const { progress, getLevel } = useProgress()

  const filtered = useMemo(
    () =>
      filterTerms(
        TERMS,
        { query, categories: selectedCategories, masteryLevels: selectedLevels },
        progress
      ),
    [query, selectedCategories, selectedLevels, progress]
  )

  const studyParams = new URLSearchParams()
  if (selectedCategories.length > 0) {
    studyParams.set("category", selectedCategories.join(","))
  }
  const studyUrl = `/study${studyParams.toString() ? `?${studyParams.toString()}` : ""}`

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>用語一覧</h1>
        <SearchBar value={query} onChange={setQuery} />
        <div className={styles.filterSection}>
          <span className={styles.filterLabel}>カテゴリ</span>
          <FilterChips
            options={CATEGORY_OPTIONS}
            selected={selectedCategories}
            onChange={setSelectedCategories}
          />
        </div>
        <div className={styles.filterSection}>
          <span className={styles.filterLabel}>習熟度</span>
          <FilterChips
            options={MASTERY_OPTIONS}
            selected={selectedLevels}
            onChange={setSelectedLevels}
          />
        </div>
      </div>

      <div className={styles.resultInfo}>
        <span className={styles.resultCount}>
          <span className={styles.resultCountNum}>{filtered.length}</span> 件の用語
        </span>
        {filtered.length > 0 && (
          <Link to={studyUrl} className={styles.studyLink}>
            この条件で学習する 📖
          </Link>
        )}
      </div>

      {filtered.length > 0 ? (
        <div className={styles.list}>
          {filtered.map((term) => (
            <TermCard key={term.id} term={term} masteryLevel={getLevel(term.id)} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🔍</div>
          <p>該当する用語が見つかりませんでした</p>
        </div>
      )}
    </div>
  )
}
