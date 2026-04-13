import { useEffect, useMemo, useState } from "react"
import Navbar from "../../../components/User/Navbar/Navbar"
import HeroBanner from "../../../components/User/HeroBanner/HeroBanner"
import SearchBar from "../../../components/common/SearchBar/SearchBar"
import SectionTitle from "../../../components/User/SectionTitle/SectionTitle"
import EventCard from "../../../components/User/EventCard/EventCard"
import CategoryCard from "../../../components/User/CategoryCard/CategoryCard"
import CityCard from "../../../components/User/CityCard/CityCard"
import Footer from "../../../components/common/Footer/Footer"
import { getCities } from "../../../services/CityService"
import { getCategories } from "../../../services/CategoryService"
import { getEvents } from "../../../services/EventService"
import {
  banners,
  seasonEvents,
} from "../../../data/HomeData"
import styles from "./Home.module.css"

const Home = () => {
  const [searchValue, setSearchValue] = useState("")
  const [cities, setCities] = useState([])
  const [categories, setCategories] = useState([])
  const [events, setEvents] = useState([])

  const filteredEvents = useMemo(() => {
    const value = searchValue.trim().toLowerCase()

    if (!value) return events

    return events.filter((event) => {
      return (
        event.name?.toLowerCase().includes(value) ||
        event.city?.name?.toLowerCase().includes(value) ||
        event.category?.name?.toLowerCase().includes(value) ||
        event.venue?.toLowerCase().includes(value)
      )
    })
  }, [searchValue, events])

  const featuredEvents = useMemo(() => {
    return filteredEvents.slice(0, 6)
  }, [filteredEvents])

  const latestEvents = useMemo(() => {
    return [...filteredEvents]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 4)
  }, [filteredEvents])

  useEffect(() => {
    ;(async () => {
      try {
        const citiesData = await getCities()
        setCities(citiesData)
      } catch (error) {
        console.error("Error fetching cities for home page", error)
      }

      try {
        const categoriesData = await getCategories()
        setCategories(categoriesData)
      } catch (error) {
        console.error("Error fetching categories for home page", error)
      }

      try {
        const eventsData = await getEvents()
        setEvents(eventsData)
      } catch (error) {
        console.error("Error fetching events for home page", error)
      }
    })()
  }, [])

  const formatEventDate = (startDateTime, endDateTime) => {
    if (!startDateTime || !endDateTime) return ""

    const start = new Date(startDateTime).toLocaleDateString("ar-SA")
    const end = new Date(endDateTime).toLocaleDateString("ar-SA")

    return `${start} - ${end}`
  }

  return (
    <main className={styles.page}>
      <Navbar />

      <div className={styles.container}>
        <SearchBar
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="ابحث عن فعالية أو فئة"
        />

        <HeroBanner banners={banners} buttonText="احجز الآن" />

        <section className={styles.section}>
          <SectionTitle title="أبرز الفعاليات" actionText="عرض المزيد" />
          <div className={styles.cardsGrid}>
            {featuredEvents.map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.name}
                subtitle={event.category?.name || ""}
                date={formatEventDate(event.startDateTime, event.endDateTime)}
                location={event.city?.name || event.venue}
                image={event.cardImageUrl}
                detailsPath={`/event/${event.id}`}
              />
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <SectionTitle title="أحدث الفعاليات" actionText="عرض المزيد" />
          <div className={styles.fourCardsGrid}>
            {latestEvents.map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.name}
                subtitle={event.category?.name || ""}
                date={formatEventDate(event.startDateTime, event.endDateTime)}
                location={event.city?.name || event.venue}
                image={event.cardImageUrl}
                variant="compact"
                detailsPath={`/event/${event.id}`}
              />
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <SectionTitle title="استكشف حسب الفئة" actionText="عرض المزيد" />
          <div className={styles.sixCardsGrid}>
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                title={category.name}
                image={category.imageUrl}
              />
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <SectionTitle title="المواسم والمهرجانات" actionText="عرض المزيد" />
          <div className={styles.cardsGrid}>
            {seasonEvents.map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                subtitle={event.subtitle}
                location={event.location}
                image={event.image}
                showDate={false}
                showPrice={false}
                detailsPath={`/event/${event.id}`}
              />
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <SectionTitle title="استكشف حسب الموقع" actionText="عرض المزيد" />
          <div className={styles.sixCardsGrid}>
            {cities.map((city) => (
              <CityCard
                key={city.id}
                title={city.name}
                image={city.imageUrl}
              />
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}

export default Home