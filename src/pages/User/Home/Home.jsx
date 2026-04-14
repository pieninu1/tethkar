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
import { getUserFavoriteIds } from "../../../services/UserFavoriteService"
import { getHeroBanners } from "../../../services/HeroBannerService"
import styles from "./Home.module.css"

const featuredSkeletons = Array.from({ length: 6 }, (_, index) => index)
const latestSkeletons = Array.from({ length: 6 }, (_, index) => index)

const Home = () => {
  const [searchValue, setSearchValue] = useState("")
  const [cities, setCities] = useState([])
  const [categories, setCategories] = useState([])
  const [events, setEvents] = useState([])
  const [favoriteIds, setFavoriteIds] = useState([])
  const [heroBanners, setHeroBanners] = useState([])
  const [eventsLoading, setEventsLoading] = useState(true)

  const normalizeArabicText = (value) => {
    return (value || "").trim().replace(/\s+/g, " ")
  }

  const isSeasonOrFestivalCategory = (categoryName) => {
    const normalized = normalizeArabicText(categoryName)
    return normalized === "موسم" || normalized === "مهرجان"
  }

  const filteredEvents = useMemo(() => {
    const value = searchValue.trim().toLowerCase()

    if (!value) return events

    return events.filter((event) => {
      return (
        event.name?.toLowerCase().includes(value) ||
        event.cityName?.toLowerCase().includes(value) ||
        event.categoryName?.toLowerCase().includes(value) ||
        event.venue?.toLowerCase().includes(value)
      )
    })
  }, [searchValue, events])

  const featuredEvents = useMemo(() => {
    return filteredEvents
      .filter((event) => !isSeasonOrFestivalCategory(event.categoryName))
      .slice(0, 8)
  }, [filteredEvents])

  const latestEvents = useMemo(() => {
    const featuredIds = new Set(featuredEvents.map((event) => event.id))

    return [...filteredEvents]
      .filter((event) => !isSeasonOrFestivalCategory(event.categoryName))
      .filter((event) => !featuredIds.has(event.id))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 8)
  }, [filteredEvents, featuredEvents])

  const seasonFestivalEvents = useMemo(() => {
    const usedIds = new Set([
      ...featuredEvents.map((event) => event.id),
      ...latestEvents.map((event) => event.id),
    ])

    return filteredEvents
      .filter((event) => isSeasonOrFestivalCategory(event.categoryName))
      .filter((event) => !usedIds.has(event.id))
      .slice(0, 8)
  }, [filteredEvents, featuredEvents, latestEvents])

  useEffect(() => {
    ;(async () => {
      try {
        const citiesData = await getCities()
        setCities(citiesData)
      } catch (error) {
        console.error("Error fetching cities", error)
      }

      try {
        const categoriesData = await getCategories()
        setCategories(categoriesData)
      } catch (error) {
        console.error("Error fetching categories", error)
      }

      try {
        const bannersData = await getHeroBanners()
        setHeroBanners(bannersData)
      } catch (error) {
        console.error("Error fetching hero banners", error)
      }

      try {
        setEventsLoading(true)
        const [eventsData, favoriteIdsData] = await Promise.all([
          getEvents(),
          getUserFavoriteIds(),
        ])
        setEvents(eventsData)
        setFavoriteIds(favoriteIdsData)
      } catch (error) {
        console.error("Error fetching home page data", error)
      } finally {
        setEventsLoading(false)
      }
    })()
  }, [])

  const handleFavoriteChange = (eventId, isFavorite) => {
    setFavoriteIds((prev) =>
      isFavorite
        ? [...new Set([...prev, eventId])]
        : prev.filter((id) => id !== eventId)
    )
  }

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

  return (
    <main className={styles.page}>
      <Navbar />

      <div className={styles.container}>
        <SearchBar
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="ابحث عن فعالية أو فئة"
        />

        <HeroBanner banners={heroBanners} buttonText="احجز الآن" />

        <section className={styles.section}>
          <SectionTitle title="أبرز الفعاليات" actionText="عرض المزيد" />

          <div className={styles.scrollRow}>
            {eventsLoading
              ? featuredSkeletons.map((item) => (
                  <div key={item} className={styles.featuredCardSlot}>
                    <div className={styles.skeletonCard}>
                      <div className={styles.skeletonImage}></div>
                      <div className={styles.skeletonContent}>
                        <div className={styles.skeletonLineSmall}></div>
                        <div className={styles.skeletonLineLarge}></div>
                        <div className={styles.skeletonLineMedium}></div>
                        <div className={styles.skeletonLinePrice}></div>
                      </div>
                    </div>
                  </div>
                ))
              : featuredEvents.map((event) => (
                  <div key={event.id} className={styles.featuredCardSlot}>
                    <EventCard
                      id={event.id}
                      title={event.name}
                      subtitle={event.categoryName || ""}
                      date={formatEventDate(
                        event.startDateTime,
                        event.endDateTime
                      )}
                      location={event.cityName || event.venue}
                      price={event.lowestTicketPrice}
                      image={event.cardImageUrl}
                      detailsPath={`/event/${event.id}`}
                      initialIsFavorite={favoriteIds.includes(event.id)}
                      onFavoriteChange={handleFavoriteChange}
                    />
                  </div>
                ))}
          </div>
        </section>

        <section className={styles.section}>
          <SectionTitle title="أحدث الفعاليات" actionText="عرض المزيد" />

          <div className={styles.scrollRow}>
            {eventsLoading
              ? latestSkeletons.map((item) => (
                  <div key={item} className={styles.latestCardSlot}>
                    <div
                      className={`${styles.skeletonCard} ${styles.skeletonCompactCard}`}
                    >
                      <div className={styles.skeletonCompactImage}></div>
                      <div className={styles.skeletonCompactContent}>
                        <div className={styles.skeletonCompactLineSmall}></div>
                        <div className={styles.skeletonCompactLineLarge}></div>
                        <div className={styles.skeletonCompactLineMedium}></div>
                        <div className={styles.skeletonCompactLinePrice}></div>
                      </div>
                    </div>
                  </div>
                ))
              : latestEvents.map((event) => (
                  <div key={event.id} className={styles.latestCardSlot}>
                    <EventCard
                      id={event.id}
                      title={event.name}
                      subtitle={event.categoryName || ""}
                      date={formatEventDate(
                        event.startDateTime,
                        event.endDateTime
                      )}
                      location={event.cityName || event.venue}
                      price={event.lowestTicketPrice}
                      image={event.cardImageUrl}
                      variant="compact"
                      detailsPath={`/event/${event.id}`}
                      initialIsFavorite={favoriteIds.includes(event.id)}
                      onFavoriteChange={handleFavoriteChange}
                    />
                  </div>
                ))}
          </div>
        </section>

        <section className={styles.section}>
          <SectionTitle title="استكشف حسب الفئة" actionText="عرض المزيد" />

          <div className={styles.scrollRow}>
            {categories.map((category) => (
              <div key={category.id} className={styles.categoryCardSlot}>
                <CategoryCard title={category.name} image={category.imageUrl} />
              </div>
            ))}
          </div>
        </section>

        {!eventsLoading && seasonFestivalEvents.length > 0 ? (
          <section className={styles.section}>
            <SectionTitle title="المواسم والمهرجانات" actionText="عرض المزيد" />

            <div className={styles.scrollRow}>
              {seasonFestivalEvents.map((event) => (
                <div key={event.id} className={styles.featuredCardSlot}>
                  <EventCard
                    id={event.id}
                    title={event.name}
                    subtitle={event.categoryName || ""}
                    date={formatEventDate(
                      event.startDateTime,
                      event.endDateTime
                    )}
                    location={event.cityName || event.venue}
                    price={event.lowestTicketPrice}
                    image={event.cardImageUrl}
                    detailsPath={`/event/${event.id}`}
                    initialIsFavorite={favoriteIds.includes(event.id)}
                    onFavoriteChange={handleFavoriteChange}
                  />
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className={styles.section}>
          <SectionTitle title="استكشف حسب الموقع" actionText="عرض المزيد" />

          <div className={styles.scrollRow}>
            {cities.map((city) => (
              <div key={city.id} className={styles.cityCardSlot}>
                <CityCard title={city.name} image={city.imageUrl} />
              </div>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}

export default Home