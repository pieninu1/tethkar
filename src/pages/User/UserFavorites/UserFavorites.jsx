import Navbar from "../../../components/User/Navbar/Navbar"
import Footer from "../../../components/common/Footer/Footer"
import ProfileSidebar from "../../../components/User/ProfileSidebar/ProfileSidebar"
import EventCard from "../../../components/User/EventCard/EventCard"
import styles from "./UserFavorites.module.css"

function UserFavorites() {
  const favoriteEvents = [
    {
      id: 2,
      title: "ليالي الدرعية",
      subtitle: "معرض",
      date: "١٢ - ٣٠ شعبان",
      location: "الدرعية",
      price: 85,
      image: "/images/event-two.jpg",
    },
    {
      id: 4,
      title: "قيادة بتقديم أحمد الشقيري",
      subtitle: "ملتقى",
      date: "١٦ - ٢١ شعبان",
      location: "الرياض",
      price: 40,
      image: "/images/event-four.jpg",
    },
  ]

  return (
    <div className={styles.page} dir="rtl">
      <div className={styles.container}>
        <Navbar />

        <main className={styles.mainContent}>
          <ProfileSidebar activeItem="favorites" />

          <section className={styles.leftSection}>
            <div className={styles.sectionBlock}>
              <h2 className={styles.sectionTitle}>المفضلة</h2>

              {favoriteEvents.length === 0 ? (
                <div className={styles.emptyState}>
                  لا توجد فعاليات مفضلة حالياً
                </div>
              ) : (
                <div className={styles.cardsGrid}>
                  {favoriteEvents.map((event) => (
                    <div key={event.id} className={styles.cardWrapper}>
                      <EventCard
                        id={event.id}
                        title={event.title}
                        subtitle={event.subtitle}
                        date={event.date}
                        location={event.location}
                        price={event.price}
                        image={event.image}
                        variant="compact"
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