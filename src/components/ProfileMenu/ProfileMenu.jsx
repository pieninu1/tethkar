import { HiOutlineUser, HiOutlineTicket, HiOutlineHeart, HiOutlineLogout } from "react-icons/hi"
import styles from "./ProfileMenu.module.css"

const ProfileMenu = ({ name, email }) => {
  return (
    <aside className={styles.menuCard}>
      <div className={styles.profileTop}>
        <div className={styles.avatar}></div>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.email}>{email}</p>
      </div>

      <div className={styles.links}>
        <div className={styles.item}>
          <HiOutlineUser />
          <span>الملف الشخصي</span>
        </div>
        <div className={styles.item}>
          <HiOutlineTicket />
          <span>تذاكري</span>
        </div>
        <div className={styles.item}>
          <HiOutlineHeart />
          <span>المفضلة</span>
        </div>
        <div className={`${styles.item} ${styles.logout}`}>
          <HiOutlineLogout />
          <span>تسجيل الخروج</span>
        </div>
      </div>
    </aside>
  )
}

export default ProfileMenu