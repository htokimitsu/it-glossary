import { Link } from "react-router-dom"
import { CATEGORY_META } from "../../styles/colors"
import { CategoryCard } from "../../components/CategoryCard/CategoryCard"
import { ProgressBar } from "../../components/ProgressBar/ProgressBar"
import { useProgress } from "../../hooks/useProgress"
import styles from "./Home.module.css"

export const Home = () => {
  const { getStats, getCategoryStats } = useProgress()
  const stats = getStats()

  return (
    <div>
      <div className={styles.hero}>
        <h1 className={styles.title}>IT用語集</h1>
        <p className={styles.subtitle}>
          プログラミング・Web開発・AIに必要な用語をマスターしよう
        </p>
      </div>

      <div className={styles.progressSection}>
        <h2 className={styles.sectionTitle}>全体の進捗</h2>
        <ProgressBar current={stats.mastered} total={stats.total} />
      </div>

      <h2 className={styles.sectionTitle}>カテゴリ</h2>
      <div className={styles.grid}>
        {CATEGORY_META.map((meta) => {
          const catStats = getCategoryStats(meta.id)
          return (
            <CategoryCard
              key={meta.id}
              meta={meta}
              totalTerms={catStats.total}
              masteredTerms={catStats.mastered}
            />
          )
        })}
      </div>

      <Link to="/study" className={styles.studyButton}>
        学習をはじめる 📖
      </Link>
    </div>
  )
}
