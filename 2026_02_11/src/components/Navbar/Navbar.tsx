import styles from './Navbar.module.scss'
import {Link} from "react-router";

export default function Navbar() {
  return (
    <nav className={styles.Navbar}>
      <ul className={styles.NavbarList}>
        <li>
          <Link
            className={styles.NavbarListLink}
            to="/"
          >
            Strona główna
          </Link>
        </li>
        <li>
          <Link
            className={styles.NavbarListLink}
            to="/wpisy"
          >
            Wpisy
          </Link>
        </li>
        <li>
          <Link
            className={styles.NavbarListLink}
            to="/kontakt"
          >
            Kontakt
          </Link>
        </li>
      </ul>
    </nav>
  )
}
