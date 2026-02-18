import styles from "./SearchBar.module.css"

interface SearchBarProps {
  readonly value: string
  readonly onChange: (value: string) => void
  readonly placeholder?: string
}

export const SearchBar = ({
  value,
  onChange,
  placeholder = "用語を検索...",
}: SearchBarProps) => (
  <div className={styles.wrapper}>
    <span className={styles.icon}>🔍</span>
    <input
      type="text"
      className={styles.input}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  </div>
)
