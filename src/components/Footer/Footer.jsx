import styles from "./Footer.module.css"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      
      {/* SOCIAL ICONS */}
      <div className={styles.socials}>
        <img src="/icons/social-tiktok.svg" alt="tiktok" />
        <img src="/icons/social-instagram.svg" alt="instagram" />
        <img src="/icons/social-snapchat.svg" alt="snapchat" />
        <img src="/icons/social-x.svg" alt="x" />
      </div>

      {/* LINKS */}
      <ul className={styles.links}>
        <li>تواصل معنا</li>
        <li>سياسة الخصوصية</li>
        <li>شروط الاستخدام</li>
        <li>الأسئلة المتكررة</li>
        <li>عن تذكار</li>
        <li>الدعم</li>
      </ul>

      {/* PAYMENT */}
      <div className={styles.payments}>
        <img src="/icons/payment-visa.svg" alt="visa" />
        <img src="/icons/payment-mastercard.svg" alt="mastercard" />
        <img src="/icons/payment-mada.svg" alt="mada" />
        <img src="/icons/payment-applepay.svg" alt="applepay" />
      </div>

    </footer>
  )
}

export default Footer