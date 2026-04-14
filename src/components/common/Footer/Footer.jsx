import {
  FaInstagram,
  FaSnapchatGhost,
  FaTiktok,
} from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import styles from "./Footer.module.css"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.topRow}>
        <div className={styles.socials}>
          <button
            type="button"
            className={styles.socialButton}
            aria-label="TikTok"
          >
            <FaTiktok className={styles.socialIcon} />
          </button>

          <button
            type="button"
            className={styles.socialButton}
            aria-label="Instagram"
          >
            <FaInstagram className={styles.socialIcon} />
          </button>

          <button
            type="button"
            className={styles.socialButton}
            aria-label="Snapchat"
          >
            <FaSnapchatGhost className={styles.socialIcon} />
          </button>

          <button
            type="button"
            className={styles.socialButton}
            aria-label="X"
          >
            <FaXTwitter className={styles.socialIcon} />
          </button>
        </div>

        <div className={styles.links}>
          <span>تواصل معنا</span>
          <span>سياسة الخصوصية</span>
          <span>شروط الاستخدام</span>
          <span>الأسئلة المتكررة</span>
          <span>عن تذكار</span>
          <span>الدعم</span>
        </div>
      </div>

      <div className={styles.payments}>
        <div className={styles.paymentBox}>
          <img
            src="/images/Visa.png"
            alt="Visa"
            className={styles.paymentImage}
          />
        </div>

        <div className={styles.paymentBox}>
          <img
            src="/images/logos_mastercard.png"
            alt="Mastercard"
            className={styles.paymentImage}
          />
        </div>

        <div className={styles.paymentBox}>
          <img
            src="/images/Mada.png"
            alt="Mada"
            className={styles.paymentImage}
          />
        </div>

        <div className={styles.paymentBox}>
          <img
            src="/images/ApplePay.png"
            alt="Apple Pay"
            className={styles.paymentImage}
          />
        </div>
      </div>
    </footer>
  )
}

export default Footer