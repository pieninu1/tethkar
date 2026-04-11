import Navbar from "../../../components/User/Navbar/Navbar"
import Footer from "../../../components/common/Footer/Footer"
import ProfileSidebar from "../../../components/User/ProfileSidebar/ProfileSidebar"
import styles from "./Profile.module.css"

function Profile() {
  return (
    <div className={styles.page} dir="rtl">
      <div className={styles.container}>
        <Navbar />

        <main className={styles.mainContent}>
          <ProfileSidebar activeItem="profile" />

          <section className={styles.leftSection}>
            <div className={styles.accountCard}>
              <h2 className={styles.cardTitle}>معلومات الحساب</h2>

              <div className={styles.accountInfo}>
                <div className={styles.infoBlock}>
                  <span className={styles.label}>البريد الإلكتروني</span>
                  <span className={styles.value}>Sarah223@gmail.com</span>
                </div>

                <div className={styles.infoBlock}>
                  <span className={styles.label}>تاريخ الإنشاء</span>
                  <span className={styles.value}>1 مارس 2026</span>
                </div>
              </div>
            </div>

            <div className={styles.personalCard}>
              <div className={styles.personalHeader}>
                <h2 className={styles.cardTitle}>المعلومات الشخصية</h2>
                <button className={styles.editBtn}>تعديل</button>
              </div>

              <div className={styles.personalInfo}>
                <div className={styles.infoRow}>
                  <span className={styles.label}>الاسم</span>
                  <span className={styles.value}>سارة أحمد</span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.label}>رقم الجوال</span>
                  <span className={styles.value}>-</span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.label}>الجنس</span>
                  <span className={styles.value}>أنثى</span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.label}>الجنسية</span>
                  <span className={styles.value}>-</span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.label}>الإقامة</span>
                  <span className={styles.value}>السعودية</span>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default Profile