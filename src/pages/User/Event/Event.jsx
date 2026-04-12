import { Link, useParams } from "react-router-dom"
import Navbar from "../../../components/User/Navbar/Navbar"
import Footer from "../../../components/common/Footer/Footer"
import {
  featuredEvents,
  latestEvents,
  seasonEvents,
} from "../../../data/HomeData"
import styles from "./Event.module.css"

function Event() {
  const { id } = useParams()

  const allEvents = [...featuredEvents, ...latestEvents, ...seasonEvents]

  const event = allEvents.find((item) => String(item.id) === String(id))

  const fallbackEvent = {
    id,
    title: "المدينة العالمية الدمام",
    subtitle: "فعالية مميزة",
    location: "المدينة العالمية الدمام",
    date: "29 ديسمبر 2025 إلى 30 مايو 2026",
    image: "/images/event-one.jpg",
    imageTwo: "/images/event-two.jpg",
    description:
      "المدينة العالمية في الدمام، المملكة العربية السعودية، هي مركز يحتفي بالتنوع ويعزز الروابط العالمية. يقدم مجموعة متنوعة من التجارب والأنشطة والمنتجات الثقافية والتجارية، ويمنح الزوار فرصة لاستكشاف ثقافات متعددة والاستمتاع بأجواء مميزة تناسب جميع أفراد العائلة.",
    time: "4:00 م - 10:00 ص",
    terms: [
      "يجب إبراز التذكرة عند الدخول.",
      "الأطفال دون سن 5 سنوات يسمح لهم بالدخول مجاناً.",
      "التذكرة غير قابلة للاسترجاع بعد إتمام الحجز.",
      "يمنع إدخال المأكولات والمشروبات من الخارج.",
    ],
  }

  const selectedEvent = event
    ? {
        ...fallbackEvent,
        ...event,
        imageTwo: event.image,
      }
    : fallbackEvent

  return (
    <div className={styles.page} dir="rtl">
      <Navbar />

      <div className={styles.container}>
        <section className={styles.heroSection}>
          <h1 className={styles.pageTitle}>{selectedEvent.title}</h1>

          <div className={styles.imagesGrid}>
            <div className={styles.largeImageCard}>
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className={styles.largeImage}
              />
            </div>

            <div className={styles.smallImageCard}>
              <img
                src={selectedEvent.imageTwo || selectedEvent.image}
                alt={selectedEvent.title}
                className={styles.smallImage}
              />
            </div>
          </div>
        </section>

        <section className={styles.detailsSection}>
          <div className={styles.bookingCard}>
            <div className={styles.infoItem}>
              <span className={styles.infoText}>
                {selectedEvent.time || "4:00 م - 10:00 ص"}
              </span>
              <span className={styles.infoIcon}>🕒</span>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoText}>
                {selectedEvent.date || "29 ديسمبر 2025 إلى 30 مايو 2026"}
              </span>
              <span className={styles.infoIcon}>📅</span>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoText}>
                {selectedEvent.location || "المدينة العالمية الدمام"}
              </span>
              <span className={styles.infoIcon}>📍</span>
            </div>

            <Link to={`/tickets/${selectedEvent.id}`} className={styles.bookBtn}>
              احجز التذكرة
            </Link>
          </div>

          <div className={styles.descriptionBlock}>
            <p className={styles.descriptionText}>
              {selectedEvent.description}
            </p>
          </div>
        </section>

        <section className={styles.termsSection}>
          <h2 className={styles.termsTitle}>الشروط والأحكام</h2>

          <ul className={styles.termsList}>
            {selectedEvent.terms.map((term, index) => (
              <li key={index}>{term}</li>
            ))}
          </ul>

          <button className={styles.moreBtn}>عرض المزيد</button>
        </section>
      </div>

      <Footer />
    </div>
  )
}

export default Event