import styles from "./FilterChips.module.css"

interface ChipOption<T extends string> {
  readonly value: T
  readonly label: string
}

interface FilterChipsProps<T extends string> {
  readonly options: readonly ChipOption<T>[]
  readonly selected: readonly T[]
  readonly onChange: (selected: readonly T[]) => void
}

export const FilterChips = <T extends string>({
  options,
  selected,
  onChange,
}: FilterChipsProps<T>) => {
  const toggle = (value: T) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value))
    } else {
      onChange([...selected, value])
    }
  }

  return (
    <div className={styles.container}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className={`${styles.chip} ${selected.includes(opt.value) ? styles.chipActive : ""}`}
          onClick={() => toggle(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
