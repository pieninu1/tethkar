import { useEffect, useState } from "react"
import Navbar from "../../../components/User/Navbar/Navbar"
import Footer from "../../../components/common/Footer/Footer"
import ProfileSidebar from "../../../components/User/ProfileSidebar/ProfileSidebar"
import EventCard from "../../../components/User/EventCard/EventCard"
import { getUserFavorites } from "../../../services/UserFavoriteService"
import { getProfile } from "../../../services/AuthService"
import styles from "./UserFavorites.module.css"

function UserFavorites() {
  const [favoriteEvents, setFavoriteEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  const formatSingleDate = (dateValue) => {
    const date = new Date(dateValue)

    const day = new Intl.DateTimeFormat("ar-SA", {
      day: "numeric",
    }).format(date)

    const month = new Intl.DateTimeFormat("ar-SA", {
      month: "long",
    }).format(date)

    return `${day} ${month}`
  }

  const formatEventDate = (startDateTime, endDateTime) => {
    if (!startDateTime || !endDateTime) return ""

    const start = formatSingleDate(startDateTime)
    const end = formatSingleDate(endDateTime)

    return `${start} - ${end}`
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [favoritesData, profileData] = await Promise.all([
          getUserFavorites(),
          getProfile(),
        ])

        setFavoriteEvents(Array.isArray(favoritesData) ? favoritesData : [])
        setUser(profileData)
      } catch (error) {
        console.error("Error fetching favorites/profile", error)
        setFavoriteEvents([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleFavoriteChange = (eventId, isFavorite) => {
    if (!isFavorite) {
      setFavoriteEvents((prev) => prev.filter((event) => event.id !== eventId))
    }
  }

  return (
    <div className={styles.page} dir="rtl">
      <div className={styles.container}>
        <Navbar />

        <main className={styles.mainContent}>
          <ProfileSidebar activeItem="favorites" user={user} />

          <section className={styles.leftSection}>
            <div className={styles.sectionBlock}>
              <h2 className={styles.sectionTitle}>المفضلة</h2>

              {loading ? (
                <div className={styles.emptyState}>جاري تحميل المفضلة...</div>
              ) : favoriteEvents.length === 0 ? (
                <div className={styles.emptyState}>
                  لا توجد فعاليات مفضلة حالياً
                </div>
              ) : (
                <div className={styles.cardsGrid}>
                  {favoriteEvents.map((event) => (
                    <div key={event.id} className={styles.cardWrapper}>
                      <EventCard
                        id={event.id}
                        title={event.name}
                        subtitle={event.category?.name || event.categoryName || ""}
                        date={formatEventDate(
                          event.startDateTime,
                          event.endDateTime
                        )}
                        location={event.city?.name || event.cityName || event.venue}
                        image={event.cardImageUrl}
                        variant="compact"
                        initialIsFavorite={true}
                        showPrice={false}
                        detailsPath={`/event/${event.id}`}
                        onFavoriteChange={handleFavoriteChange}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default UserFavorites