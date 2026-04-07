import {
  HiOutlineLocationMarker,
  HiOutlineGlobeAlt,
  HiOutlineUserCircle,
} from "react-icons/hi"
import styles from "./Navbar.module.css"

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.rightSection}>
        <img
          src="/images/the-logo.png"
          alt="Tethkar Logo"
          className={styles.logo}
        />

        <ul className={styles.navLinks}>
          <li>الرئيسية</li>
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

        <HiOutlineUserCircle className={styles.icon} />
      </div>
    </nav>
  )
}

export default Navbar