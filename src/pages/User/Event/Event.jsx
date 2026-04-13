import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Navbar from "../../../components/User/Navbar/Navbar"
import Footer from "../../../components/common/Footer/Footer"
import { getEventById } from "../../../services/EventService"
import styles from "./Event.module.css"

function Event() {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      try {
        const data = await getEventById(id)
        setEvent(data)
      } catch (error) {
        console.error("Error fetching event details", error)
      } finally {
        setLoading(false)
      }
    })()
  }, [id])

  if (loading) {
    return (
      <div className={styles.page} dir="rtl">
        <Navbar />
        <div className={styles.container}>جاري تحميل الفعالية...</div>
        <Footer />
      </div>
    )
  }

  if (!event) {
    return (
      <div className={styles.page} dir="rtl">
        <Navbar />
        <div className={styles.container}>لم يتم العثور على الفعالية</div>
        <Footer />
      </div>
    )
  }

  const eventDate = `${new Date(event.startDateTime).toLocaleDateString("ar-SA")} إلى ${new Date(event.endDateTime).toLocaleDateString("ar-SA")}`

  const eventTime = `${new Date(event.startDateTime).toLocaleTimeString("ar-SA", {
    hour: "2-digit",
    minute: "2-digit",
  })} - ${new Date(event.endDateTime).toLocaleTimeString("ar-SA", {
    hour: "2-digit",
    minute: "2-digit",
  })}`

  return (
    <div className={styles.page} dir="rtl">
      <Navbar />

      <div className={styles.container}>
        <section className={styles.heroSection}>
          <h1 className={styles.pageTitle}>{event.name}</h1>

          <div className={styles.imagesGrid}>
            <div className={styles.largeImageCard}>
              <img
                src={event.detailsImageUrl1 || event.cardImageUrl}
                alt={event.name}
                className={styles.largeImage}
              />
            </div>

            <div className={styles.smallImageCard}>
              <img
                src={event.detailsImageUrl2 || event.cardImageUrl}
                alt={event.name}
                className={styles.smallImage}
              />
            </div>
          </div>
        </section>

        <section className={styles.detailsSection}>
          <div className={styles.bookingCard}>
            <div className={styles.infoItem}>
              <span className={styles.infoText}>{eventTime}</span>
              <span className={styles.infoIcon}>🕒</span>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoText}>{eventDate}</span>
              <span className={styles.infoIcon}>📅</span>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoText}>
                {event.city?.name || event.venue}
              </span>
              <span className={styles.infoIcon}>📍</span>
            </div>

            <Link to={`/tickets/${event.id}`} className={styles.bookBtn}>
              احجز التذكرة
            </Link>
          </div>

          <div className={styles.descriptionBlock}>
            <p className={styles.descriptionText}>{event.description}</p>
          </div>
        </section>

        <section className={styles.termsSection}>
          <h2 className={styles.termsTitle}>الشروط والأحكام</h2>

          <ul className={styles.termsList}>
            <li>يجب إبراز التذكرة عند الدخول.</li>
            <li>الأطفال دون سن 5 سنوات يسمح لهم بالدخول مجاناً.</li>
            <li>التذكرة غير قابلة للاسترجاع بعد إتمام الحجز.</li>
            <li>يمنع إدخال المأكولات والمشروبات من الخارج.</li>
          </ul>

          <button className={styles.moreBtn}>عرض المزيد</button>
        </section>
      </div>

      <Footer />
    </div>
  )
}

export default Event