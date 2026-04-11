import { useMemo, useState } from "react"
import Navbar from "../../../components/User/Navbar/Navbar"
import HeroBanner from "../../../components/User/HeroBanner/HeroBanner"
import SearchBar from "../../../components/common/SearchBar/SearchBar"
import SectionTitle from "../../../components/User/SectionTitle/SectionTitle"
import EventCard from "../../../components/User/EventCard/EventCard"
import CategoryCard from "../../../components/User/CategoryCard/CategoryCard"
import CityCard from "../../../components/User/CityCard/CityCard"
import Footer from "../../../components/common/Footer/Footer"
import {
  banners,
  categories,
  featuredEvents,
  latestEvents,
  locations,
  seasonEvents,
} from "../../../data/HomeData"
import styles from "./Home.module.css"

const Home = () => {
  const [searchValue, setSearchValue] = useState("")

  const filteredFeaturedEvents = useMemo(() => {
    const value = searchValue.trim().toLowerCase()

    if (!value) return featuredEvents

    return featuredEvents.filter((event) => {
      return (
        event.title.toLowerCase().includes(value) ||
        event.subtitle.toLowerCase().includes(value) ||
        event.location.toLowerCase().includes(value)
      )
    })
  }, [searchValue])

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
            {filteredFeaturedEvents.map((event) => (
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
        </section>

        <section className={styles.section}>
          <SectionTitle title="أحدث الفعاليات" actionText="عرض المزيد" />
          <div className={styles.fourCardsGrid}>
            {latestEvents.map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                subtitle={event.subtitle}
                date={event.date}
                location={event.location}
                price={event.price}
                image={event.image}
                variant="compact"
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
                title={category.title}
                image={category.image}
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
              />
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <SectionTitle title="استكشف حسب الموقع" actionText="عرض المزيد" />
          <div className={styles.sixCardsGrid}>
            {locations.map((location) => (
              <CityCard
                key={location.id}
                title={location.title}
                image={location.image}
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