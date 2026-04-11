import styles from "./Footer.module.css"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <span>تواصل معنا</span>
        <span>سياسة الخصوصية</span>
        <span>شروط الاستخدام</span>
        <span>الأسئلة المتكررة</span>
        <span>عن تذكار</span>
        <span>الدعم</span>
      </div>

      <div className={styles.payments}>
        <span className={styles.payment}>VISA</span>
        <span className={styles.payment}>Mastercard</span>
        <span className={styles.payment}>Mada</span>
        <span className={styles.payment}>Apple Pay</span>
      </div>
    </footer>
  )
}

export default Footer