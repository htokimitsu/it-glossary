export type Category =
  | "file-extension"
  | "programming-basics"
  | "web-technology"
  | "ai-ml"
  | "dev-tools"
  | "network"
  | "database"

export interface Term {
  readonly id: string
  readonly name: string
  readonly reading: string
  readonly description: string
  readonly category: Category
  readonly tags: readonly string[]
}

export interface CategoryMeta {
  readonly id: Category
  readonly label: string
  readonly icon: string
  readonly color: string
  readonly bgColor: string
}

export type MasteryLevel = "unlearned" | "learning" | "mastered"

export interface TermProgress {
  readonly termId: string
  readonly level: MasteryLevel
  readonly lastStudied: string | null
}

export type ProgressData = Readonly<Record<string, TermProgress>>
