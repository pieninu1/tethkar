import { useState, useEffect } from "react"
import TicketTypeModal from "./TicketTypeModal/TicketTypeModal"
import DeleteModal from "../../../components/DeleteModal/DeleteModal"
import TopPart from "../../../components/TopPart/TopPart"
import Button from "../../../components/Button/Button"
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
      setEvents(data)
    } catch (error) {
      console.error("Error fetching events", error)
    }
  }

  const fetchTicketTypes = async () => {
    try {
      const data = await getTicketTypes()
      setTicketTypes(data)
    } catch (error) {
      console.error("Error fetching ticket types", error)
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
    if (ticketTypeToDelete) {
      try {
        await deleteTicketType(ticketTypeToDelete.ticketTypeId)
        fetchTicketTypes()
        closeDeleteModal()
      } catch (error) {
        console.error("Error deleting ticket type", error)
      }
    }
  }

  const handleTicketTypeSubmit = async (data) => {
    if (data.ticketTypeId != null) {
      try {
        await updateTicketType(data)
        fetchTicketTypes()
        closeDefaultModal()
      } catch (error) {
        console.error("Error updating ticket type", error)
      }
    } else {
      try {
        await addTicketType(data)
        fetchTicketTypes()
        closeDefaultModal()
      } catch (error) {
        console.error("Error adding ticket type", error)
      }
    }
  }

  return (
    <main className={styles.page} aria-label="قائمة أنواع التذاكر">
      <TopPart title="أنواع التذاكر">
        <Button text="إضافة نوع تذكرة" onClick={openAddModal} />
      </TopPart>

      <section className={styles.ticketTypesList}>
        {ticketTypes.map((ticketType) => (
          <article key={ticketType.ticketTypeId} className={styles.card}>
            <h2 className={styles.cardTitle}>{ticketType.typeName}</h2>
            <p className={styles.meta}>السعر: {ticketType.price}</p>
            <p className={styles.meta}>الكمية: {ticketType.quantity}</p>
            <p className={styles.eventName}>
              الفعالية: {ticketType.event?.eventName || "—"}
            </p>

            <div className={styles.cardActions}>
              <Button
                text="تعديل"
                onClick={() => openEditModal(ticketType)}
                variant="secondary"
              />
              <Button
                text="حذف"
                onClick={() => openDeleteModal(ticketType)}
                variant="danger"
              />
            </div>
          </article>
        ))}
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
            ? `هل أنت متأكد من حذف نوع التذكرة "${ticketTypeToDelete.typeName}"؟`
            : ""
        }
      />
    </main>
  )
}

export default TicketType