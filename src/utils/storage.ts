import type { ProgressData } from "../types"

const STORAGE_KEY = "it-glossary-progress"

export const loadProgress = (): ProgressData => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed: unknown = JSON.parse(raw)
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      return {}
    }
    return parsed as ProgressData
  } catch {
    return {}
  }
}

export const saveProgress = (data: ProgressData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // LocalStorage full or unavailable — silently ignore
  }
}
