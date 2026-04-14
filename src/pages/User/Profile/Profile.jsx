import { useEffect, useState } from "react"
import Navbar from "../../../components/User/Navbar/Navbar"
import Footer from "../../../components/common/Footer/Footer"
import ProfileSidebar from "../../../components/User/ProfileSidebar/ProfileSidebar"
import { getProfile } from "../../../services/AuthService"
import styles from "./Profile.module.css"

function Profile() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile()
        console.log("PROFILE DATA:", data)
        setUser(data)
      } catch (error) {
        console.error("Error fetching profile:", error)
        setErrorMessage(error.message || "فشل تحميل بيانات الملف الشخصي")
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  if (loading) {
    return (
      <div className={styles.page} dir="rtl">
        <div className={styles.container}>
          <Navbar />

          <main className={styles.mainContent}>
            <ProfileSidebar activeItem="profile" user={null} />

            <section className={styles.leftSection}>
              <div className={styles.accountCard}>
                <h2 className={styles.cardTitle}>جاري تحميل البيانات...</h2>
              </div>
            </section>
          </main>

          <Footer />
        </div>
      </div>
    )
  }

  if (errorMessage) {
    return (
      <div className={styles.page} dir="rtl">
        <div className={styles.container}>
          <Navbar />

          <main className={styles.mainContent}>
            <ProfileSidebar activeItem="profile" user={null} />

            <section className={styles.leftSection}>
              <div className={styles.accountCard}>
                <h2 className={styles.cardTitle}>تعذر تحميل الملف الشخصي</h2>
                <p className={styles.value}>{errorMessage}</p>
              </div>
            </section>
          </main>

          <Footer />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page} dir="rtl">
      <div className={styles.container}>
        <Navbar />

        <main className={styles.mainContent}>
          <ProfileSidebar activeItem="profile" user={user} />

          <section className={styles.leftSection}>
            <div className={styles.accountCard}>
              <h2 className={styles.cardTitle}>معلومات الحساب</h2>

              <div className={styles.accountInfo}>
                <div className={styles.infoBlock}>
                  <span className={styles.label}>البريد الإلكتروني</span>
                  <span className={styles.value}>{user?.email || "-"}</span>
                </div>

                <div className={styles.infoBlock}>
                  <span className={styles.label}>تاريخ الإنشاء</span>
                  <span className={styles.value}>
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("ar-SA")
                      : "-"}
                  </span>
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
                  <span className={styles.value}>
                    {user ? `${user.firstName} ${user.lastName}` : "-"}
                  </span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.label}>رقم الجوال</span>
                  <span className={styles.value}>{user?.phoneNumber || "-"}</span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.label}>الجنس</span>
                  <span className={styles.value}>{user?.gender || "-"}</span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.label}>الجنسية</span>
                  <span className={styles.value}>{user?.nationality || "-"}</span>
                </div>

                <div className={styles.infoRow}>
                  <span className={styles.label}>الإقامة</span>
                  <span className={styles.value}>{user?.residence || "-"}</span>
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