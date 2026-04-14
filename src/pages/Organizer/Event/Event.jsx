import { useState, useEffect } from "react"
import EventModal from "./EventModal/EventModal"
import DeleteModal from "../../../components/common/DeleteModal/DeleteModal"
import TopPart from "../../../components/common/TopPart/TopPart"
import Button from "../../../components/common/Button/Button"
import styles from "./Event.module.css"
import {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
} from "../../../services/EventService"
import { getCities } from "../../../services/CityService"
import { getCategories } from "../../../services/CategoryService"

const formatDateTime = (value) => {
  if (!value) return "-"
  return new Date(value).toLocaleString("ar-SA")
}

const Event = () => {
  const [defaultModalOpen, setDefaultModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [eventToDelete, setEventToDelete] = useState(null)
  const [events, setEvents] = useState([])
  const [cities, setCities] = useState([])
  const [categories, setCategories] = useState([])

  const fetchEvents = async () => {
    try {
      const data = await getEvents()
      setEvents(Array.isArray(data) ? data : [])
    } catch {
      setEvents([])
    }
  }

  const fetchCities = async () => {
    const data = await getCities()
    setCities(Array.isArray(data) ? data : [])
  }

  const fetchCategories = async () => {
    const data = await getCategories()
    setCategories(Array.isArray(data) ? data : [])
  }

  useEffect(() => {
    ;(async () => {
      await fetchEvents()
      await fetchCities()
      await fetchCategories()
    })()
  }, [])

  const openAddModal = () => {
    setSelectedEvent(null)
    setDefaultModalOpen(true)
  }

  const openEditModal = (event) => {
    setSelectedEvent(event)
    setDefaultModalOpen(true)
  }

  const openDeleteModal = (event) => {
    setEventToDelete(event)
    setDeleteModalOpen(true)
  }

  const closeDefaultModal = () => {
    setDefaultModalOpen(false)
    setSelectedEvent(null)
  }

  const closeDeleteModal = () => {
    setDeleteModalOpen(false)
    setEventToDelete(null)
  }

  const handleConfirmDelete = async () => {
    if (!eventToDelete) return
    await deleteEvent(eventToDelete.id)
    await fetchEvents()
    closeDeleteModal()
  }

  const handleEventSubmit = async (data) => {
    if (data.Id != null) {
      await updateEvent(data)
    } else {
      await addEvent(data)
    }

    await fetchEvents()
    closeDefaultModal()
  }

  return (
    <main className={styles.page}>
      <TopPart title="الفعاليات">
        <Button text="إنشاء فعالية" onClick={openAddModal} />
      </TopPart>

      <section className={styles.eventsSection}>
        {events.length === 0 ? (
          <div className={styles.emptyState}>لا توجد فعاليات حالياً</div>
        ) : (
          <div className={styles.eventsList}>
            {events.map((event) => {
              const shortTerms =
                event.termsAndConditions?.slice(0, 80) || ""

              return (
                <article key={event.id} className={styles.eventCard}>
                  <div className={styles.cardImageWrapper}>
                    {event.cardImageUrl ? (
                      <img
                        src={event.cardImageUrl}
                        alt={event.name}
                        className={styles.cardImage}
                      />
                    ) : (
                      <div className={styles.imagePlaceholder}>بدون صورة</div>
                    )}
                  </div>

                  <div className={styles.cardContent}>
                    <h2 className={styles.cardTitle}>{event.name}</h2>

                    <div className={styles.metaGroup}>
                      <p>من: {formatDateTime(event.startDateTime)}</p>
                      <p>إلى: {formatDateTime(event.endDateTime)}</p>
                      <p>الموقع: {event.venue}</p>
                    </div>

                    <p className={styles.description}>{event.description}</p>

                    {event.termsAndConditions && (
                      <div className={styles.termsPreview}>
                        {shortTerms}...
                        <button
                          className={styles.moreBtn}
                          onClick={() => openEditModal(event)}
                        >
                          المزيد
                        </button>
                      </div>
                    )}

                    <div className={styles.cardActions}>
                      <button onClick={() => openEditModal(event)}>
                        تعديل
                      </button>
                      <button onClick={() => openDeleteModal(event)}>
                        حذف
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </section>

      <EventModal
        isOpen={defaultModalOpen}
        onClose={closeDefaultModal}
        event={selectedEvent}
        cities={cities}
        categories={categories}
        onSubmit={handleEventSubmit}
      />

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
      />
    </main>
  )
}

export default Event