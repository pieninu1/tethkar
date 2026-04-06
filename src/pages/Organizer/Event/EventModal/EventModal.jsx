import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Modal from "../../../../components/Modal/Modal"
import FormModel from "../../../../components/FormModel/FormModel"
import Input from "../../../../components/Input/Input"
import Button from "../../../../components/Button/Button"
import { eventSchema } from "../EventSchema"
import styles from "./EventModal.module.css"

const EventModal = ({ isOpen, onClose, event, cities, categories, onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(eventSchema),
    mode: "all",
    defaultValues: {
      Name: "",
      StartDateTime: "",
      EndDateTime: "",
      Venue: "",
      Description: "",
      CityId: "",
      CategoryId: "",
      Id: undefined,
    },
  })

  useEffect(() => {
    if (isOpen) {
      if (event) {
        reset({
          Name: event.name || "",
          StartDateTime: event.startDateTime?.slice(0, 16) || "",
          EndDateTime: event.endDateTime?.slice(0, 16) || "",
          Venue: event.venue || "",
          Description: event.description || "",
          CityId: event.cityId ?? "",
          CategoryId: event.categoryId ?? "",
          Id: event.id,
        })
      } else {
        reset({
          Name: "",
          StartDateTime: "",
          EndDateTime: "",
          Venue: "",
          Description: "",
          CityId: "",
          CategoryId: "",
          Id: undefined,
        })
      }
    }
  }, [isOpen, event, reset])

  const handleFormSubmit = async (data) => {
    try {
      await onSubmit({
        Id: event?.id,
        Name: data.Name,
        StartDateTime: data.StartDateTime,
        EndDateTime: data.EndDateTime,
        Venue: data.Venue,
        Description: data.Description,
        CityId: Number(data.CityId),
        CategoryId: Number(data.CategoryId),
      })
      onClose()
    } catch (error) {
      console.error("Error submitting event", error)
    }
  }

  const title = event ? `الفعالية: ${event.name}` : "إضافة فعالية"

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <FormModel>
        <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
          <Input
            label="اسم الفعالية"
            type="text"
            placeholder="أدخل اسم الفعالية"
            error={errors.Name?.message}
            {...register("Name")}
          />

          <Input
            label="تاريخ البداية"
            type="datetime-local"
            error={errors.StartDateTime?.message}
            {...register("StartDateTime")}
          />

          <Input
            label="تاريخ النهاية"
            type="datetime-local"
            error={errors.EndDateTime?.message}
            {...register("EndDateTime")}
          />

          <Input
            label="الموقع"
            type="text"
            placeholder="أدخل الموقع"
            error={errors.Venue?.message}
            {...register("Venue")}
          />

          <Input
            label="الوصف"
            type="text"
            placeholder="أدخل وصف الفعالية"
            error={errors.Description?.message}
            {...register("Description")}
          />

          <div className={styles.field}>
            <label htmlFor="CityId">المدينة</label>
            <select id="CityId" className={styles.select} {...register("CityId")}>
              <option value="">اختر المدينة</option>
              {cities?.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
            {errors.CityId && (
              <span className={styles.error}>{errors.CityId.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="CategoryId">التصنيف</label>
            <select id="CategoryId" className={styles.select} {...register("CategoryId")}>
              <option value="">اختر التصنيف</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.CategoryId && (
              <span className={styles.error}>{errors.CategoryId.message}</span>
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