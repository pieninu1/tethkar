import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Modal from "../../../components/Modal/Modal"
import FormModel from "../../../components/FormModel/FormModel"
import Input from "../../../components/Input/Input"
import Button from "../../../components/Button/Button"
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
    if (isOpen) {
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
      onClose()
    } catch (error) {
      console.error("Error submitting ticket type", error)
    }
  }

  const title = ticketType
    ? `تعديل ${ticketType.typeName}`
    : "إضافة نوع تذكرة"

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <FormModel>
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
            <label htmlFor="eventId">الفعالية</label>

            <select
              id="eventId"
              className={styles.select}
              {...register("eventId", { valueAsNumber: true })}
            >
              <option value="">اختر الفعالية</option>

              {events?.map((event) => (
                <option key={event.eventId} value={event.eventId}>
                  {event.eventName}
                </option>
              ))}
            </select>

            {errors.eventId && (
              <span className={styles.error}>
                {errors.eventId.message}
              </span>
            )}
          </div>

          <Button
            type="submit"
            text={
              isSubmitting
                ? "جاري الحفظ..."
                : ticketType
                ? "تحديث"
                : "إضافة"
            }
            disabled={isSubmitting}
          />
        </form>
      </FormModel>
    </Modal>
  )
}

export default TicketTypeModal