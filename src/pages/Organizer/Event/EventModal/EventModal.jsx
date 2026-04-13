import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Modal from "../../../../components/common/Modal/Modal"
import Input from "../../../../components/common/Input/Input"
import { eventSchema } from "../EventSchema"
import styles from "./EventModal.module.css"

const EventModal = ({
  isOpen,
  onClose,
  event,
  cities,
  categories,
  onSubmit,
}) => {
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
      CardImageUrl: "",
      DetailsImageUrl1: "",
      DetailsImageUrl2: "",
      Id: undefined,
    },
  })

  useEffect(() => {
    if (!isOpen) return

    if (event) {
      reset({
        Name: event.name || "",
        StartDateTime: event.startDateTime?.slice(0, 16) || "",
        EndDateTime: event.endDateTime?.slice(0, 16) || "",
        Venue: event.venue || "",
        Description: event.description || "",
        CityId: event.cityId ?? "",
        CategoryId: event.categoryId ?? "",
        CardImageUrl: event.cardImageUrl || "",
        DetailsImageUrl1: event.detailsImageUrl1 || "",
        DetailsImageUrl2: event.detailsImageUrl2 || "",
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
        CardImageUrl: "",
        DetailsImageUrl1: "",
        DetailsImageUrl2: "",
        Id: undefined,
      })
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
        CardImageUrl: data.CardImageUrl,
        DetailsImageUrl1: data.DetailsImageUrl1,
        DetailsImageUrl2: data.DetailsImageUrl2,
      })
    } catch (error) {
      console.error("Error submitting event", error)
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
            {event ? "تعديل فعالية" : "إنشاء فعالية جديدة"}
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
          <div className={styles.grid}>
            <div className={styles.field}>
              <Input
                label="اسم الفعالية"
                type="text"
                error={errors.Name?.message}
                {...register("Name")}
              />
            </div>

            <div className={styles.field}>
              <Input
                label="الموقع"
                type="text"
                error={errors.Venue?.message}
                {...register("Venue")}
              />
            </div>

            <div className={styles.field}>
              <Input
                label="تاريخ بداية الفعالية"
                type="datetime-local"
                error={errors.StartDateTime?.message}
                {...register("StartDateTime")}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="CityId" className={styles.selectLabel}>
                المدينة
              </label>
              <select
                id="CityId"
                className={styles.select}
                {...register("CityId")}
              >
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
              <Input
                label="تاريخ نهاية الفعالية"
                type="datetime-local"
                error={errors.EndDateTime?.message}
                {...register("EndDateTime")}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="CategoryId" className={styles.selectLabel}>
                الفئة
              </label>
              <select
                id="CategoryId"
                className={styles.select}
                {...register("CategoryId")}
              >
                <option value="">اختر الفئة</option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.CategoryId && (
                <span className={styles.error}>
                  {errors.CategoryId.message}
                </span>
              )}
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="Description" className={styles.selectLabel}>
              الوصف الطويل
            </label>
            <textarea
              id="Description"
              className={styles.textarea}
              {...register("Description")}
            />
            {errors.Description && (
              <span className={styles.error}>{errors.Description.message}</span>
            )}
          </div>

          <div className={styles.grid}>
            <div className={styles.field}>
              <Input
                label="رابط صورة الكارد"
                type="text"
                error={errors.CardImageUrl?.message}
                {...register("CardImageUrl")}
              />
            </div>

            <div className={styles.field}>
              <Input
                label="رابط صورة التفاصيل الأولى"
                type="text"
                error={errors.DetailsImageUrl1?.message}
                {...register("DetailsImageUrl1")}
              />
            </div>

            <div className={styles.field}>
              <Input
                label="رابط صورة التفاصيل الثانية"
                type="text"
                error={errors.DetailsImageUrl2?.message}
                {...register("DetailsImageUrl2")}
              />
            </div>
          </div>

          <div className={styles.actionRow}>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? "جاري الحفظ..." : event ? "تحديث الفعالية" : "إنشاء فعالية"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default EventModal