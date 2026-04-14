import { Outlet, NavLink, useNavigate } from "react-router-dom"
import {
  HiOutlineTag,
  HiOutlineUsers,
  HiOutlineCog,
  HiOutlineLogout,
  HiOutlineSearch,
  HiOutlineLocationMarker,
  HiOutlineCalendar,
  HiOutlinePhotograph,
} from "react-icons/hi"
import styles from "./AdminLayout.module.css"

function AdminLayout() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    localStorage.removeItem("rememberMe")
    navigate("/")
  }

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
              to="/admin/categories"
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.activeNavItem : ""}`
              }
            >
              <HiOutlineTag />
              <span>الفئات</span>
            </NavLink>

            <NavLink
              to="/admin/cities"
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.activeNavItem : ""}`
              }
            >
              <HiOutlineLocationMarker />
              <span>المدن</span>
            </NavLink>

            <NavLink
              to="/admin/hero-banners"
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.activeNavItem : ""}`
              }
            >
              <HiOutlinePhotograph />
              <span>البنرات الرئيسية</span>
            </NavLink>

            <button className={styles.navItem} type="button">
              <HiOutlineUsers />
              <span>المنظمين</span>
            </button>

            <button className={styles.navItem} type="button">
              <HiOutlineCalendar />
              <span>الفعاليات</span>
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
              <input type="text" placeholder="ابحث" />
            </div>
          </div>
        </header>

        <main className={styles.pageContent}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout