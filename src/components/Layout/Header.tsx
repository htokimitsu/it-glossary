import { NavLink } from "react-router-dom"
import styles from "./Header.module.css"

export const Header = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`

  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.logo}>
        <span className={styles.logoIcon}>📚</span>
        <span>IT用語集</span>
      </NavLink>
      <nav className={styles.nav}>
        <NavLink to="/" end className={linkClass}>
          ホーム
        </NavLink>
        <NavLink to="/terms" className={linkClass}>
          用語一覧
        </NavLink>
        <NavLink to="/study" className={linkClass}>
          学習
        </NavLink>
      </nav>
    </header>
  )
}
