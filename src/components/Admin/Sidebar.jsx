import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>تذكار</div>

      <nav className={styles.nav}>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          الرئيسية
        </NavLink>

        <NavLink
          to="/cities"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          المدن
        </NavLink>

        <NavLink
          to="/categories"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          الفئات
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;