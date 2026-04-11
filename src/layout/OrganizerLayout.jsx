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
    navigate("/");
  };

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div>
          {/* Logo */}
          <img
            src="/images/the-logo.png"
            alt="Tethkar Logo"
            className={styles.logo}
          />

          {/* Navigation */}
          <nav className={styles.nav}>
            {/* Dashboard */}
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.activeNavItem : ""}`
              }
            >
              <HiOutlineHome />
              <span>الرئيسية</span>
            </NavLink>

            {/* Events */}
            <NavLink
              to="/events"
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.activeNavItem : ""}`
              }
            >
              <HiOutlineCalendar />
              <span>الفعاليات</span>
            </NavLink>

            {/* Ticket Types */}
            <NavLink
              to="/ticket-types"
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.activeNavItem : ""}`
              }
            >
              <HiOutlineTicket />
              <span>التذاكر</span>
            </NavLink>

            {/* Reports */}
            <button className={styles.navItem} type="button">
              <HiOutlineDocumentText />
              <span>التقارير</span>
            </button>

            {/* Notifications */}
            <button className={styles.navItem} type="button">
              <HiOutlineBell />
              <span>الإشعارات</span>
            </button>

            {/* Settings */}
            <button className={styles.navItem} type="button">
              <HiOutlineCog />
              <span>الإعدادات</span>
            </button>
          </nav>
        </div>

        {/* Logout */}
        <button className={styles.logoutBtn} onClick={handleLogout}>
          <HiOutlineLogout />
          <span>تسجيل الخروج</span>
        </button>
      </aside>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Header */}
        <header className={styles.header}>
          {/* Profile picture */}
          <div className={styles.profileCircle}></div>

          {/* Centered Search */}
          <div className={styles.searchWrapper}>
            <div className={styles.searchBox}>
              <HiOutlineSearch className={styles.searchIcon} />
              <input type="text" placeholder="Search" />
            </div>
          </div>
        </header>

        {/* Pages will render here */}
        <main className={styles.pageContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default OrganizerLayout;