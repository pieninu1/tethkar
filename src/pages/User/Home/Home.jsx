import { useState } from "react"
import Navbar from "../../../components/Navbar/Navbar"
import HeroBanner from "../../../components/HeroBanner/HeroBanner"
import SearchBar from "../../../components/SearchBar/SearchBar"
import SectionTitle from "../../../components/SectionTitle/SectionTitle"
import EventCard from "../../../components/EventCard/EventCard"
import styles from "./Home.module.css"

const banners = [
  {
    id: 1,
    title: "يوم التأسيس",
    subtitle: "ثلاثة قرون من العز والفخر",
    image: "/images/banner-one.jpg",
  },
  {
    id: 2,
    title: "ليالي استثنائية",
    subtitle: "فعاليات مميزة وتجارب لا تُنسى",
    image: "/images/banner-two.jpg",
  },
  {
    id: 3,
    title: "استكشف أجمل الفعاليات",
    subtitle: "احجز تذكرتك بسهولة وفي ثوانٍ",
    image: "/images/banner-three.jpg",
  },
]

const featuredEvents = [
  {
    id: 1,
    title: "المدينة المائية",
    subtitle: "منتزه ترفيهي",
    date: "١ رجب - ١٠ شعبان",
    location: "جدة",
    price: 45,
    image: "/images/event-one.jpg",
  },
  {
    id: 2,
    title: "ليالي الدرعية",
    subtitle: "معرض",
    date: "٣ شعبان - ٥ رمضان",
    location: "الدرعية",
    price: 85,
    image: "/images/event-two.jpg",
  },
  {
    id: 3,
    title: "بوليفارد المغرب",
    subtitle: "فعالية",
    date: "١٣ شعبان",
    location: "الرياض",
    price: 60,
    image: "/images/event-three.jpg",
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
  {
    id: 5,
    title: "3D Piper",
    subtitle: "حفلة",
    date: "٢٠ شعبان",
    location: "الرياض",
    price: 120,
    image: "/images/event-five.jpg",
  },
]

const Home = () => {
  const [searchValue, setSearchValue] = useState("")

  const filteredEvents = featuredEvents.filter((event) => {
    const value = searchValue.trim().toLowerCase()
    if (!value) return true

    return (
      event.title.toLowerCase().includes(value) ||
      event.subtitle.toLowerCase().includes(value) ||
      event.location.toLowerCase().includes(value)
    )
  })

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <Navbar />

        <SearchBar
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="ابحث عن فعالية أو فئة"
        />

        <HeroBanner banners={banners} buttonText="احجز الآن" />

        <div className={styles.section}>
          <SectionTitle title="أبرز الفعاليات" actionText="عرض المزيد" />

          <div className={styles.cardsGrid}>
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                subtitle={event.subtitle}
                date={event.date}
                location={event.location}
                price={event.price}
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