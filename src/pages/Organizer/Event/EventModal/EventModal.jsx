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
    watch,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      Name: "",
      TermsAndConditions: "",
    },
  })

  useEffect(() => {
    if (!isOpen) return

    reset({
      Name: event?.name || "",
      TermsAndConditions: event?.termsAndConditions || "",
    })
  }, [isOpen, event, reset])

  const handleFormSubmit = async (data) => {
    await onSubmit({
      Id: event?.id,
      ...data,
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.wrapper}>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Input label="اسم الفعالية" {...register("Name")} />

          <textarea
            className={styles.textarea}
            placeholder="الشروط والأحكام"
            {...register("TermsAndConditions")}
          />

          <div className={styles.previewBox}>
            <p className={styles.previewTitle}>معاينة:</p>
            <div className={styles.previewContent}>
              {watch("TermsAndConditions")}
            </div>
          </div>

          <button disabled={isSubmitting}>
            {isSubmitting ? "جاري الحفظ..." : "حفظ"}
          </button>
        </form>
      </div>
    </Modal>
  )
}

export default EventModal