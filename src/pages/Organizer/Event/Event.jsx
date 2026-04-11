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
      setEvents(data)
    } catch (error) {
      console.error("Error fetching events", error)
    }
  }

  const fetchCities = async () => {
    try {
      const data = await getCities()
      setCities(data)
    } catch (error) {
      console.error("Error fetching cities", error)
    }
  }

  const fetchCategories = async () => {
    try {
      const data = await getCategories()
      setCategories(data)
    } catch (error) {
      console.error("Error fetching categories", error)
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
                  {event.image ? (
                    <img
                      src={event.image}
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
                    <p className={styles.metaLine}>{event.startDateTime}</p>
                    <p className={styles.metaLine}>{event.endDateTime}</p>
                    <p className={styles.metaLine}>{event.venue}</p>
                    <p className={styles.metaLine}>
                      {event.city?.name || "-"}
                    </p>
                    <p className={styles.metaLine}>
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