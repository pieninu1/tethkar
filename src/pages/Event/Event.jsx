import { useState, useEffect } from "react"
import EventModal from "./EventModal/EventModal"
import DeleteModal from "../../components/DeleteModal/DeleteModal"
import TopPart from "../../components/TopPart/TopPart"
import Button from "../../components/Button/Button"
import styles from "./Event.module.css"
import { getEvents, addEvent, updateEvent, deleteEvent } from "../../services/EventService"
import { getCities } from "../../services/CityService"

const Event = () => {
  const [defaultModalOpen, setDefaultModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [eventToDelete, setEventToDelete] = useState(null)
  const [events, setEvents] = useState([])
  const [cities, setCities] = useState([])

  const fetchCities = async () => {
    try {
      const data = await getCities()
      setCities(data)
    } catch (error) {
      console.error("Error fetching cities", error)
    }
  }

  const fetchEvents = async () => {
    try {
      const data = await getEvents()
      setEvents(data)
    } catch (error) {
      console.error("Error fetching events", error)
    }
  }

  useEffect(() => {
    ;(async () => {
      await fetchEvents()
      await fetchCities()
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
    if (eventToDelete) {
      try {
        await deleteEvent(eventToDelete.eventId)
        fetchEvents()
        closeDeleteModal()
      } catch (error) {
        console.error("Error deleting event", error)
      }
    }
  }

  const handleEventSubmit = async (data) => {
    if (data.eventId != null) {
      try {
        await updateEvent(data)
        fetchEvents()
        closeDefaultModal()
      } catch (error) {
        console.error("Error updating event", error)
      }
    } else {
      try {
        await addEvent(data)
        fetchEvents()
        closeDefaultModal()
      } catch (error) {
        console.error("Error adding event", error)
      }
    }
  }

  return (
    <main className={styles.page} aria-label="قائمة الفعاليات">
      <TopPart title="الفعاليات">
        <Button text="إضافة فعالية" onClick={openAddModal} />
      </TopPart>

      <section className={styles.eventsList}>
        {events.map((event) => (
          <article key={event.eventId} className={styles.card}>
            <h2 className={styles.cardTitle}>{event.eventName}</h2>
            <p className={styles.meta}>
              البداية: {event.startDateTime}
            </p>
            <p className={styles.meta}>
              النهاية: {event.endDateTime}
            </p>
            <p className={styles.location}>{event.venue}</p>
            <p className={styles.description}>{event.description}</p>
            <p className={styles.city}>{event.city?.cityName}</p>

            <div className={styles.cardActions}>
              <Button text="تعديل" onClick={() => openEditModal(event)} variant="secondary" />
              <Button text="حذف" onClick={() => openDeleteModal(event)} variant="danger" />
            </div>
          </article>
        ))}
      </section>

      <EventModal
        isOpen={defaultModalOpen}
        onClose={closeDefaultModal}
        event={selectedEvent}
        cities={cities}
        onSubmit={handleEventSubmit}
      />

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        title="حذف الفعالية"
        message={eventToDelete ? `هل أنت متأكد من حذف الفعالية "${eventToDelete.eventName}"؟` : ""}
      />
    </main>
  )
}

export default Event