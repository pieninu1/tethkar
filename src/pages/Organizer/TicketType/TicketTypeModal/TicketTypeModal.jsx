import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Modal from "../../../../components/common/Modal/Modal"
import Input from "../../../../components/common/Input/Input"
import { ticketTypeSchema } from "../TicketTypeSchema"
import styles from "./TicketTypeModal.module.css"

const TicketTypeModal = ({
  isOpen,
  onClose,
  ticketType,
  events,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(ticketTypeSchema),
    mode: "all",
    defaultValues: {
      typeName: "",
      price: 0,
      quantity: 1,
      eventId: undefined,
      ticketTypeId: undefined,
    },
  })

  useEffect(() => {
    if (!isOpen) return

    if (ticketType) {
      reset({
        typeName: ticketType.typeName,
        price: ticketType.price,
        quantity: ticketType.quantity,
        eventId: ticketType.eventId,
        ticketTypeId: ticketType.ticketTypeId,
      })
    } else {
      reset({
        typeName: "",
        price: 0,
        quantity: 1,
        eventId: undefined,
        ticketTypeId: undefined,
      })
    }
  }, [isOpen, ticketType, reset])

  const handleFormSubmit = async (data) => {
    try {
      await onSubmit({
        typeName: data.typeName,
        price: Number(data.price),
        quantity: Number(data.quantity),
        eventId: Number(data.eventId),
        ticketTypeId: ticketType?.ticketTypeId,
      })
    } catch (error) {
      console.error("Error submitting ticket type", error)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      hideHeader
      className={styles.modalShell}
      bodyClassName={styles.modalBody}
    >
      <div className={styles.wrapper}>
        <div className={styles.headerRow}>
          <h2 className={styles.title}>
            {ticketType ? `تعديل ${ticketType.typeName}` : "إضافة نوع تذكرة"}
          </h2>

          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="إغلاق"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
          <Input
            label="نوع التذكرة"
            type="text"
            placeholder="مثال: VIP"
            error={errors.typeName?.message}
            {...register("typeName")}
          />

          <Input
            label="السعر"
            type="number"
            placeholder="أدخل السعر"
            error={errors.price?.message}
            {...register("price", { valueAsNumber: true })}
          />

          <Input
            label="الكمية"
            type="number"
            placeholder="أدخل الكمية"
            error={errors.quantity?.message}
            {...register("quantity", { valueAsNumber: true })}
          />

          <div className={styles.field}>
            <label htmlFor="eventId" className={styles.selectLabel}>
              الفعالية
            </label>

            <select
              id="eventId"
              className={styles.select}
              {...register("eventId", { valueAsNumber: true })}
            >
              <option value="">اختر الفعالية</option>

              {events?.map((event) => (
                <option
                  key={event.id || event.eventId}
                  value={event.id || event.eventId}
                >
                  {event.name || event.eventName}
                </option>
              ))}
            </select>

            {errors.eventId && (
              <span className={styles.error}>{errors.eventId.message}</span>
            )}
          </div>

          <div className={styles.actionRow}>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? "جاري الحفظ..." : ticketType ? "تحديث" : "إضافة"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default TicketTypeModal