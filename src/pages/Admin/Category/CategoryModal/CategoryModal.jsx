import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Modal from "../../../../components/common/Modal/Modal"
import Input from "../../../../components/common/Input/Input"
import { categorySchema } from "../CategorySchema"
import styles from "./CategoryModal.module.css"

const CategoryModal = ({ isOpen, onClose, category, onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(categorySchema),
    mode: "all",
    defaultValues: {
      Name: "",
      ImageUrl: "",
      Id: undefined,
    },
  })

  useEffect(() => {
    if (!isOpen) return

    reset(
      category
        ? {
            Name: category.name || "",
            ImageUrl: category.imageUrl || "",
            Id: category.id,
          }
        : {
            Name: "",
            ImageUrl: "",
            Id: undefined,
          }
    )
  }, [isOpen, category, reset])

  const handleFormSubmit = async (data) => {
    try {
      await onSubmit({
        Name: data.Name,
        ImageUrl: data.ImageUrl,
        Id: category?.id,
      })
    } catch (error) {
      console.error("Error submitting category", error)
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
            {category ? "تعديل فئة" : "إضافة فئة جديدة"}
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
          <div className={styles.field}>
            <Input
              label="اسم الفئة"
              type="text"
              placeholder="أدخل اسم الفئة"
              error={errors.Name?.message}
              {...register("Name")}
            />
          </div>

          <div className={styles.field}>
            <Input
              label="رابط صورة الفئة"
              type="text"
              placeholder="أدخل رابط الصورة"
              error={errors.ImageUrl?.message}
              {...register("ImageUrl")}
            />
          </div>

          <div className={styles.actionRow}>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? "جاري الحفظ..." : category ? "تحديث" : "إضافة"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default CategoryModal