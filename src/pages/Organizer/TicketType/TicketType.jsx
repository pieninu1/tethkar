import { useState, useEffect } from "react"
import TicketTypeModal from "./TicketTypeModal/TicketTypeModal"
import DeleteModal from "../../../components/common/DeleteModal/DeleteModal"
import TopPart from "../../../components/common/TopPart/TopPart"
import Button from "../../../components/common/Button/Button"
import styles from "./TicketType.module.css"
import {
  getTicketTypes,
  addTicketType,
  updateTicketType,
  deleteTicketType,
} from "../../../services/TicketTypeService"
import { getEvents } from "../../../services/EventService"

const TicketType = () => {
  const [defaultModalOpen, setDefaultModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedTicketType, setSelectedTicketType] = useState(null)
  const [ticketTypeToDelete, setTicketTypeToDelete] = useState(null)
  const [ticketTypes, setTicketTypes] = useState([])
  const [events, setEvents] = useState([])

  const fetchEvents = async () => {
    try {
      const data = await getEvents()
      setEvents(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error fetching events", error)
      setEvents([])
    }
  }

  const fetchTicketTypes = async () => {
    try {
      const data = await getTicketTypes()
      setTicketTypes(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error fetching ticket types", error)
      setTicketTypes([])
    }
  }

  useEffect(() => {
    ;(async () => {
      await fetchTicketTypes()
      await fetchEvents()
    })()
  }, [])

  const openAddModal = () => {
    setSelectedTicketType(null)
    setDefaultModalOpen(true)
  }

  const openEditModal = (ticketType) => {
    setSelectedTicketType(ticketType)
    setDefaultModalOpen(true)
  }

  const openDeleteModal = (ticketType) => {
    setTicketTypeToDelete(ticketType)
    setDeleteModalOpen(true)
  }

  const closeDefaultModal = () => {
    setDefaultModalOpen(false)
    setSelectedTicketType(null)
  }

  const closeDeleteModal = () => {
    setDeleteModalOpen(false)
    setTicketTypeToDelete(null)
  }

  const handleConfirmDelete = async () => {
    if (!ticketTypeToDelete) return

    try {
      await deleteTicketType(ticketTypeToDelete.id)
      await fetchTicketTypes()
      closeDeleteModal()
    } catch (error) {
      console.error("Error deleting ticket type", error)
    }
  }

  const handleTicketTypeSubmit = async (data) => {
    try {
      if (data.id != null) {
        await updateTicketType(data)
      } else {
        await addTicketType(data)
      }

      await fetchTicketTypes()
      closeDefaultModal()
    } catch (error) {
      console.error("Error saving ticket type", error)
    }
  }

  return (
    <main className={styles.page} aria-label="قائمة أنواع التذاكر">
      <TopPart title="أنواع التذاكر">
        <Button text="إضافة نوع تذكرة" onClick={openAddModal} />
      </TopPart>

      <section className={styles.ticketTypesList}>
        {ticketTypes.length === 0 ? (
          <div className={styles.emptyState}>لا توجد أنواع تذاكر حالياً</div>
        ) : (
          ticketTypes.map((ticketType) => (
            <article key={ticketType.id} className={styles.card}>
              <h2 className={styles.cardTitle}>{ticketType.name}</h2>

              <p className={styles.meta}>
                <span className={styles.label}>السعر:</span> {ticketType.price}
              </p>

              <p className={styles.meta}>
                <span className={styles.label}>الكمية:</span> {ticketType.quantity}
              </p>

              <p className={styles.eventName}>
                <span className={styles.label}>الفعالية:</span>{" "}
                {ticketType.event?.name || "—"}
              </p>

              <div className={styles.cardActions}>
                <button
                  type="button"
                  className={styles.editBtn}
                  onClick={() => openEditModal(ticketType)}
                >
                  تعديل
                </button>

                <button
                  type="button"
                  className={styles.deleteBtn}
                  onClick={() => openDeleteModal(ticketType)}
                >
                  حذف
                </button>
              </div>
            </article>
          ))
        )}
      </section>

      <TicketTypeModal
        isOpen={defaultModalOpen}
        onClose={closeDefaultModal}
        ticketType={selectedTicketType}
        events={events}
        onSubmit={handleTicketTypeSubmit}
      />

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        title="حذف نوع التذكرة"
        message={
          ticketTypeToDelete
            ? `هل أنت متأكد من حذف نوع التذكرة "${ticketTypeToDelete.name}"؟`
            : ""
        }
      />
    </main>
  )
}

export default TicketType