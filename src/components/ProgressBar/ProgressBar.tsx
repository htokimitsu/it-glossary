import styles from "./ProgressBar.module.css"

interface ProgressBarProps {
  readonly current: number
  readonly total: number
  readonly size?: "normal" | "small"
  readonly showLabel?: boolean
}

export const ProgressBar = ({
  current,
  total,
  size = "normal",
  showLabel = true,
}: ProgressBarProps) => {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0

  return (
    <div className={`${styles.container} ${size === "small" ? styles.small : ""}`}>
      {showLabel && (
        <div className={styles.label}>
          <span>
            <span className={styles.count}>{current}</span> / {total} 語習得
          </span>
          <span className={styles.count}>{percentage}%</span>
        </div>
      )}
      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  )
}
