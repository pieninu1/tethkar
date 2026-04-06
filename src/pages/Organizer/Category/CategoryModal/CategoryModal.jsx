import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Modal from "../../../../components/Modal/Modal"
import FormModel from "../../../../components/FormModel/FormModel"
import Input from "../../../../components/Input/Input"
import Button from "../../../../components/Button/Button"
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
    defaultValues: { Name: "", Id: undefined },
  })

  useEffect(() => {
    if (isOpen) {
      reset(
        category
          ? { Name: category.name, Id: category.id }
          : { Name: "", Id: undefined }
      )
    }
  }, [isOpen, category, reset])

  const handleFormSubmit = async (data) => {
    try {
      await onSubmit({
        Name: data.Name,
        Id: category?.id,
      })
      onClose()
    } catch (error) {
      console.error("Error submitting category", error)
    }
  }

  const title = category ? `التصنيف: ${category.name}` : "إضافة تصنيف"

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <FormModel>
        <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
          <Input
            label="الاسم"
            type="text"
            placeholder="اسم التصنيف"
            error={errors.Name?.message}
            {...register("Name")}
          />

          <Button
            type="submit"
            text={isSubmitting ? "جاري الحفظ..." : category ? "تحديث" : "إضافة"}
            disabled={isSubmitting}
          />
        </form>
      </FormModel>
    </Modal>
  )
}

export default CategoryModal