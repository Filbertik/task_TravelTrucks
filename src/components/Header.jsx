import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

const navLinkClassName = ({ isActive }) =>
  [styles.navLink, isActive ? styles.navLinkActive : ""]
    .filter(Boolean)
    .join(" ");

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.brand}>
          Travel<span className={styles.brandEnd}>Trucks</span>
        </NavLink>

        <nav
          role="navigation"
          aria-label="Primary navigation"
          className={styles.nav}
        >
          <ul className={styles.navList}>
            <li>
              <NavLink to="/" end className={navLinkClassName}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/catalog" end className={navLinkClassName}>
                Catalog
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
