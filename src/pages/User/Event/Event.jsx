import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import {
  HiOutlineArrowRight,
  HiOutlineClock,
  HiOutlineCalendar,
  HiOutlineLocationMarker,
} from "react-icons/hi"
import Navbar from "../../../components/User/Navbar/Navbar"
import Footer from "../../../components/common/Footer/Footer"
import { getEventById } from "../../../services/EventService"
import styles from "./Event.module.css"

function Event() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showFullTerms, setShowFullTerms] = useState(false)

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

  const formatArabicDateRange = (start, end) => {
    const startDate = new Date(start)
    const endDate = new Date(end)

    const formatter = new Intl.DateTimeFormat("ar-SA", {
      day: "numeric",
      month: "long",
    })

    const startFormatted = formatter.format(startDate)
    const endFormatted = formatter.format(endDate)

    if (startFormatted === endFormatted) {
      return startFormatted
    }

    return `${startFormatted} - ${endFormatted}`
  }

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

  const eventDate = formatArabicDateRange(
    event.startDateTime,
    event.endDateTime
  )

  const eventTime = `${new Date(event.startDateTime).toLocaleTimeString(
    "ar-SA",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  )} - ${new Date(event.endDateTime).toLocaleTimeString("ar-SA", {
    hour: "2-digit",
    minute: "2-digit",
  })}`

  const termsText = event.termsAndConditions || ""
  const isLongTerms = termsText.length > 220

  const displayedTerms =
    showFullTerms || !isLongTerms
      ? termsText
      : `${termsText.slice(0, 220).trim()}...`

  return (
    <div className={styles.page} dir="rtl">
      <Navbar />

      <div className={styles.container}>
        <section className={styles.heroSection}>
          <button
            type="button"
            className={styles.backBtn}
            onClick={() => navigate(-1)}
            aria-label="رجوع"
          >
            <HiOutlineArrowRight />
          </button>

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
              <div className={styles.infoContent}>
                <span className={styles.infoIcon}>
                  <HiOutlineClock />
                </span>
                <span className={styles.infoText}>{eventTime}</span>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoContent}>
                <span className={styles.infoIcon}>
                  <HiOutlineCalendar />
                </span>
                <span className={styles.infoText}>{eventDate}</span>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoContent}>
                <span className={styles.infoIcon}>
                  <HiOutlineLocationMarker />
                </span>
                <span className={styles.infoText}>
                  {event.cityName || event.city?.name || event.venue}
                </span>
              </div>
            </div>

            <Link to={`/tickets/${event.id}`} className={styles.bookBtn}>
              احجز التذكرة
            </Link>
          </div>

          <div className={styles.descriptionBlock}>
            <p className={styles.descriptionText}>{event.description}</p>
          </div>
        </section>

        {termsText && (
          <section className={styles.termsSection}>
            <h2 className={styles.termsTitle}>الشروط والأحكام</h2>

            <div
              className={`${styles.termsText} ${
                showFullTerms ? styles.expanded : ""
              }`}
            >
              {displayedTerms}
            </div>

            {isLongTerms && (
              <button
                type="button"
                className={styles.moreBtn}
                onClick={() => setShowFullTerms((prev) => !prev)}
              >
                {showFullTerms ? "عرض أقل" : "عرض المزيد"}
              </button>
            )}
          </section>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default Event