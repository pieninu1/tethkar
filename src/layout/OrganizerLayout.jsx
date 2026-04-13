import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  HiOutlineHome,
  HiOutlineCalendar,
  HiOutlineTicket,
  HiOutlineDocumentText,
  HiOutlineBell,
  HiOutlineCog,
  HiOutlineLogout,
  HiOutlineSearch,
} from "react-icons/hi";
import styles from "./OrganizerLayout.module.css";

function OrganizerLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("rememberMe");
    navigate("/");
  };

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div>
          <img
            src="/images/the-logo.png"
            alt="Tethkar Logo"
            className={styles.logo}
          />

          <nav className={styles.nav}>
            <NavLink
              to="/organizer/dashboard"
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.activeNavItem : ""}`
              }
            >
              <HiOutlineHome />
              <span>الرئيسية</span>
            </NavLink>

            <NavLink
              to="/organizer/events"
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.activeNavItem : ""}`
              }
            >
              <HiOutlineCalendar />
              <span>الفعاليات</span>
            </NavLink>

            <NavLink
              to="/organizer/ticket-types"
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.activeNavItem : ""}`
              }
            >
              <HiOutlineTicket />
              <span>التذاكر</span>
            </NavLink>

            <button className={styles.navItem} type="button">
              <HiOutlineDocumentText />
              <span>التقارير</span>
            </button>

            <button className={styles.navItem} type="button">
              <HiOutlineBell />
              <span>الإشعارات</span>
            </button>

            <button className={styles.navItem} type="button">
              <HiOutlineCog />
              <span>الإعدادات</span>
            </button>
          </nav>
        </div>

        <button className={styles.logoutBtn} onClick={handleLogout}>
          <HiOutlineLogout />
          <span>تسجيل الخروج</span>
        </button>
      </aside>

      <div className={styles.mainContent}>
        <header className={styles.header}>
          <div className={styles.profileCircle}></div>

          <div className={styles.searchWrapper}>
            <div className={styles.searchBox}>
              <HiOutlineSearch className={styles.searchIcon} />
              <input type="text" placeholder="Search" />
            </div>
          </div>
        </header>

        <main className={styles.pageContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default OrganizerLayout;