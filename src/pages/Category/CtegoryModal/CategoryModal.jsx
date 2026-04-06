import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Modal from "../../../components/Modal/Modal"
import FormModel from "../../../components/FormModel/FormModel"
import Input from "../../../components/Input/Input"
import Button from "../../../components/Button/Button"
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
    defaultValues: { categoryName: "", categoryId: undefined },
  })

  useEffect(() => {
    if (isOpen) {
      reset(
        category
          ? { categoryName: category.categoryName, categoryId: category.categoryId }
          : { categoryName: "", categoryId: undefined }
      )
    }
  }, [isOpen, category, reset])

  const handleFormSubmit = async (data) => {
    try {
      await onSubmit({
        categoryName: data.categoryName,
        categoryId: category?.categoryId,
      })
      onClose()
    } catch (error) {
      console.error("Error submitting category", error)
    }
  }

  const title = category
    ? `التصنيف: ${category.categoryName}`
    : "إضافة تصنيف"

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <FormModel>
        <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
          <Input
            label="الاسم"
            type="text"
            placeholder="اسم التصنيف"
            error={errors.categoryName?.message}
            {...register("categoryName")}
          />

          <Button
            type="submit"
            text={
              isSubmitting
                ? "جاري الحفظ..."
                : category
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

export default CategoryModal