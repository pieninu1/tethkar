import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  HiOutlineLocationMarker,
  HiOutlineGlobeAlt,
  HiOutlineUserCircle,
  HiOutlineUser,
  HiOutlineTicket,
  HiOutlineHeart,
  HiOutlineSupport,
  HiOutlineLogout,
} from "react-icons/hi"
import styles from "./Navbar.module.css"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const menuRef = useRef(null)

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <nav className={styles.navbar}>
      <div className={styles.rightSection}>
        <img
          src="/images/the-logo.png"
          alt="Tethkar Logo"
          className={styles.logo}
        />

        <ul className={styles.navLinks}>
          <li>
            <Link to="/home">الرئيسية</Link>
          </li>
          <li>استكشف</li>
          <li>من نحن</li>
          <li>تواصل معنا</li>
        </ul>
      </div>

      <div className={styles.leftSection}>
        <HiOutlineLocationMarker className={styles.icon} />
        <span className={styles.city}>جدة</span>

        <HiOutlineGlobeAlt className={styles.icon} />
        <span>AR</span>

        <div className={styles.profileWrapper} ref={menuRef}>
          <button
            type="button"
            className={styles.profileButton}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="فتح قائمة المستخدم"
          >
            <HiOutlineUserCircle className={styles.icon} />
          </button>

          {menuOpen && (
            <div className={styles.profileMenu}>
              <Link
                to="/profile"
                className={styles.menuItem}
                onClick={() => setMenuOpen(false)}
              >
                <HiOutlineUser className={styles.menuIcon} />
                <span>الملف الشخصي</span>
              </Link>

              <Link
                to="/tickets"
                className={styles.menuItem}
                onClick={() => setMenuOpen(false)}
              >
                <HiOutlineTicket className={styles.menuIcon} />
                <span>تذاكري</span>
              </Link>

              <Link
                to="/favorites"
                className={styles.menuItem}
                onClick={() => setMenuOpen(false)}
              >
                <HiOutlineHeart className={styles.menuIcon} />
                <span>المفضلة</span>
              </Link>

              <button type="button" className={styles.menuItem}>
                <HiOutlineSupport className={styles.menuIcon} />
                <span>التواصل مع الدعم</span>
              </button>

              <button
                type="button"
                className={`${styles.menuItem} ${styles.logoutItem}`}
                onClick={handleLogout}
              >
                <HiOutlineLogout className={styles.menuIcon} />
                <span>تسجيل الخروج</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar