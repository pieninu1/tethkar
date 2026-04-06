import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Modal from "../../../components/Modal/Modal"
import FormModel from "../../../components/FormModel/FormModel"
import Input from "../../../components/Input/Input"
import Button from "../../../components/Button/Button"
import { eventSchema } from "../EventSchema"
import styles from "./EventModal.module.css"

const EventModal = ({ isOpen, onClose, event, cities, onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(eventSchema),
    mode: "all",
    defaultValues: {
      eventName: "",
      startDateTime: "",
      endDateTime: "",
      venue: "",
      description: "",
      cityId: undefined,
      eventId: undefined,
    },
  })

  useEffect(() => {
    if (isOpen) {
      if (event) {
        reset({
          eventName: event.eventName,
          startDateTime: event.startDateTime?.slice(0, 16) || "",
          endDateTime: event.endDateTime?.slice(0, 16) || "",
          venue: event.venue,
          description: event.description,
          cityId: event.cityId,
          eventId: event.eventId,
        })
      } else {
        reset({
          eventName: "",
          startDateTime: "",
          endDateTime: "",
          venue: "",
          description: "",
          cityId: undefined,
          eventId: undefined,
        })
      }
    }
  }, [isOpen, event, reset])

  const handleFormSubmit = async (data) => {
    try {
      await onSubmit({
        eventName: data.eventName,
        startDateTime: data.startDateTime,
        endDateTime: data.endDateTime,
        venue: data.venue,
        description: data.description,
        cityId: Number(data.cityId),
        eventId: event?.eventId,
      })
      onClose()
    } catch (error) {
      console.error("Error submitting event", error)
    }
  }

  const title = event ? event.eventName : "إضافة فعالية"

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <FormModel>
        <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
          <Input
            label="اسم الفعالية"
            type="text"
            placeholder="أدخل اسم الفعالية"
            error={errors.eventName?.message}
            {...register("eventName")}
          />

          <Input
            label="تاريخ البداية"
            type="datetime-local"
            error={errors.startDateTime?.message}
            {...register("startDateTime")}
          />

          <Input
            label="تاريخ النهاية"
            type="datetime-local"
            error={errors.endDateTime?.message}
            {...register("endDateTime")}
          />

          <Input
            label="الموقع"
            type="text"
            placeholder="أدخل الموقع"
            error={errors.venue?.message}
            {...register("venue")}
          />

          <Input
            label="الوصف"
            type="text"
            placeholder="أدخل وصف الفعالية"
            error={errors.description?.message}
            {...register("description")}
          />

          <div className={styles.field}>
            <label htmlFor="cityId">المدينة</label>
            <select
              id="cityId"
              className={styles.select}
              {...register("cityId", { valueAsNumber: true })}
            >
              <option value="">اختر المدينة</option>
              {cities?.map((city) => (
                <option key={city.cityId} value={city.cityId}>
                  {city.cityName}
                </option>
              ))}
            </select>
            {errors.cityId && (
              <span className={styles.error}>{errors.cityId.message}</span>
            )}
          </div>

          <Button
            type="submit"
            text={isSubmitting ? "جاري الحفظ..." : event ? "تحديث" : "إضافة"}
            disabled={isSubmitting}
          />
        </form>
      </FormModel>
    </Modal>
  )
}

export default EventModal