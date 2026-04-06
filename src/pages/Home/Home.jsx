import Navbar from "../../components/Navbar/Navbar"
import HeroBanner from "../../components/HeroBanner/HeroBanner"
import SectionTitle from "../../components/SectionTitle/SectionTitle"
import EventCard from "../../components/EventCard/EventCard"
import styles from "./Home.module.css"

const featuredEvents = [
  {
    id: 1,
    title: "المدينة المائية",
    subtitle: "فعالية صيفية ممتعة",
    date: "يبدأ من ٥ مايو",
    image: "/images/event-1.jpg",
  },
  {
    id: 2,
    title: "ليالي الدرعية",
    subtitle: "تجربة موسيقية ساحرة",
    date: "يبدأ من ٨ مايو",
    image: "/images/event-2.jpg",
  },
  {
    id: 3,
    title: "بوليفارد المغرب",
    subtitle: "أجواء ممتعة ومختلفة",
    date: "يبدأ من ١٣ مايو",
    image: "/images/event-3.jpg",
  },
  {
    id: 4,
    title: "أمسية فنية",
    subtitle: "عرض خاص ومميز",
    date: "يبدأ من ١٤ مايو",
    image: "/images/event-4.jpg",
  },
  {
    id: 5,
    title: "حفلة 3D Piper",
    subtitle: "ليلة موسيقية رائعة",
    date: "يبدأ من ٢٠ مايو",
    image: "/images/event-5.jpg",
  },
]

const Home = () => {
  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <Navbar />

        <HeroBanner
          title="يوم التأسيس"
          subtitle="ثلاثة قرون من العز والفخر"
          image="/images/hero-banner.jpg"
          buttonText="احجز الآن"
        />

        <div className={styles.section}>
          <SectionTitle title="أبرز الفعاليات" actionText="عرض المزيد" />

          <div className={styles.cardsGrid}>
            {featuredEvents.map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                subtitle={event.subtitle}
                date={event.date}
                image={event.image}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home