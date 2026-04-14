import {
  HiOutlineHeart,
  HiOutlineLogout,
  HiOutlineSupport,
  HiOutlineTicket,
  HiOutlineUser,
} from "react-icons/hi"
import { Link, useNavigate } from "react-router-dom"
import styles from "./ProfileSidebar.module.css"

function ProfileSidebar({ activeItem = "profile", user }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    navigate("/")
  }

  return (
    <aside className={styles.sidebarCard}>
      <div className={styles.profileTop}>
        <div className={styles.avatar}></div>

        <div className={styles.profileText}>
          <h3 className={styles.profileName}>
            {user ? `${user.firstName} ${user.lastName}` : "-"}
          </h3>
          <p className={styles.profileEmail}>{user?.email || "-"}</p>
        </div>
      </div>

      <div className={styles.menuList}>
        <Link
          to="/profile"
          className={`${styles.menuItem} ${
            activeItem === "profile" ? styles.active : ""
          }`}
        >
          <HiOutlineUser className={styles.menuIcon} />
          <span className={styles.menuText}>الملف الشخصي</span>
        </Link>

        <Link
          to="/tickets"
          className={`${styles.menuItem} ${
            activeItem === "tickets" ? styles.active : ""
          }`}
        >
          <HiOutlineTicket className={styles.menuIcon} />
          <span className={styles.menuText}>تذاكري</span>
        </Link>

        <Link
          to="/favorites"
          className={`${styles.menuItem} ${
            activeItem === "favorites" ? styles.active : ""
          }`}
        >
          <HiOutlineHeart className={styles.menuIcon} />
          <span className={styles.menuText}>المفضلة</span>
        </Link>

        <div className={styles.menuItem}>
          <HiOutlineSupport className={styles.menuIcon} />
          <span className={styles.menuText}>التواصل مع الدعم</span>
        </div>
      </div>

      <button className={styles.logoutBtn} type="button" onClick={handleLogout}>
        <HiOutlineLogout className={styles.logoutIcon} />
        <span>تسجيل الخروج</span>
      </button>
    </aside>
  )
}

export default ProfileSidebar