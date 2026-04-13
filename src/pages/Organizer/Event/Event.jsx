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
      console.log("Events in organizer:", data)
      setEvents(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error fetching events", error)
      setEvents([])
    }
  }

  const fetchCities = async () => {
    try {
      const data = await getCities()
      console.log("Cities in organizer:", data)
      setCities(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error fetching cities", error)
      setCities([])
    }
  }

  const fetchCategories = async () => {
    try {
      const data = await getCategories()
      console.log("Categories in organizer:", data)
      setCategories(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error fetching categories", error)
      setCategories([])
    }
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

    try {
      await deleteEvent(eventToDelete.id)
      await fetchEvents()
      closeDeleteModal()
    } catch (error) {
      console.error("Error deleting event", error)
    }
  }

  const handleEventSubmit = async (data) => {
    try {
      if (data.Id != null) {
        await updateEvent(data)
      } else {
        await addEvent(data)
      }

      await fetchEvents()
      closeDefaultModal()
    } catch (error) {
      console.error("Error saving event", error)
    }
  }

  return (
    <main className={styles.page} aria-label="الفعاليات">
      <TopPart title="الفعاليات">
        <Button text="إنشاء فعالية" onClick={openAddModal} />
      </TopPart>

      <section className={styles.eventsSection}>
        {events.length === 0 ? (
          <div className={styles.emptyState}>لا توجد فعاليات حالياً</div>
        ) : (
          <div className={styles.eventsList}>
            {events.map((event) => (
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
                    <p className={styles.metaLine}>
                      <span className={styles.metaLabel}>من:</span>{" "}
                      {formatDateTime(event.startDateTime)}
                    </p>

                    <p className={styles.metaLine}>
                      <span className={styles.metaLabel}>إلى:</span>{" "}
                      {formatDateTime(event.endDateTime)}
                    </p>

                    <p className={styles.metaLine}>
                      <span className={styles.metaLabel}>الموقع:</span>{" "}
                      {event.venue || "-"}
                    </p>

                    <p className={styles.metaLine}>
                      <span className={styles.metaLabel}>المدينة:</span>{" "}
                      {event.city?.name || "-"}
                    </p>

                    <p className={styles.metaLine}>
                      <span className={styles.metaLabel}>الفئة:</span>{" "}
                      {event.category?.name || "-"}
                    </p>
                  </div>

                  <p className={styles.description}>{event.description}</p>

                  <div className={styles.cardActions}>
                    <button
                      type="button"
                      className={styles.editBtn}
                      onClick={() => openEditModal(event)}
                    >
                      تعديل
                    </button>

                    <button
                      type="button"
                      className={styles.deleteBtn}
                      onClick={() => openDeleteModal(event)}
                    >
                      حذف
                    </button>
                  </div>
                </div>
              </article>
            ))}
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
        title="حذف الفعالية"
        message={
          eventToDelete
            ? `هل أنت متأكد من حذف الفعالية "${eventToDelete.name}"؟`
            : ""
        }
      />
    </main>
  )
}

export default Event