import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Modal from "../../../../components/common/Modal/Modal"
import Input from "../../../../components/common/Input/Input"
import { heroBannerSchema } from "../heroBannerSchema"
import styles from "./HeroBannerModal.module.css"

const HeroBannerModal = ({ isOpen, onClose, banner, onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(heroBannerSchema),
    mode: "all",
    defaultValues: {
      Title: "",
      Subtitle: "",
      ImageUrl: "",
      ButtonText: "احجز الآن",
      ButtonLink: "",
      DisplayOrder: 0,
      IsActive: true,
      Id: undefined,
    },
  })

  const isActive = watch("IsActive")

  useEffect(() => {
    if (!isOpen) return

    reset(
      banner
        ? {
            Title: banner.title || "",
            Subtitle: banner.subtitle || "",
            ImageUrl: banner.imageUrl || "",
            ButtonText: banner.buttonText || "احجز الآن",
            ButtonLink: banner.buttonLink || "",
            DisplayOrder: banner.displayOrder ?? 0,
            IsActive: banner.isActive ?? true,
            Id: banner.id,
          }
        : {
            Title: "",
            Subtitle: "",
            ImageUrl: "",
            ButtonText: "احجز الآن",
            ButtonLink: "",
            DisplayOrder: 0,
            IsActive: true,
            Id: undefined,
          }
    )
  }, [isOpen, banner, reset])

  const handleFormSubmit = async (data) => {
    console.log("Hero banner valid submit:", data)

    try {
      await onSubmit({
        Title: data.Title.trim(),
        Subtitle: data.Subtitle.trim(),
        ImageUrl: data.ImageUrl?.trim() || "",
        ButtonText: data.ButtonText.trim(),
        ButtonLink: data.ButtonLink?.trim() || "",
        DisplayOrder: Number(data.DisplayOrder),
        IsActive: data.IsActive,
        Id: data.Id,
      })
    } catch (error) {
      console.error("Error submitting hero banner", error)
    }
  }

  const handleFormInvalid = (formErrors) => {
    console.log("Hero banner invalid submit:", formErrors)
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
            {banner ? "تعديل البنر" : "إضافة بنر جديد"}
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

        <form
          onSubmit={handleSubmit(handleFormSubmit, handleFormInvalid)}
          className={styles.form}
          noValidate
        >
          <div className={styles.field}>
            <Input
              label="عنوان البنر"
              type="text"
              placeholder="أدخل عنوان البنر"
              error={errors.Title?.message}
              {...register("Title")}
            />
          </div>

          <div className={styles.field}>
            <Input
              label="وصف البنر"
              type="text"
              placeholder="أدخل وصف البنر"
              error={errors.Subtitle?.message}
              {...register("Subtitle")}
            />
          </div>

          <div className={styles.field}>
            <Input
              label="رابط صورة البنر"
              type="text"
              placeholder="أدخل رابط الصورة"
              error={errors.ImageUrl?.message}
              {...register("ImageUrl")}
            />
          </div>

          <div className={styles.field}>
            <Input
              label="نص الزر"
              type="text"
              placeholder="أدخل نص الزر"
              error={errors.ButtonText?.message}
              {...register("ButtonText")}
            />
          </div>

          <div className={styles.field}>
            <Input
              label="رابط الزر"
              type="text"
              placeholder="أدخل رابط الزر"
              error={errors.ButtonLink?.message}
              {...register("ButtonLink")}
            />
          </div>

          <div className={styles.field}>
            <Input
              label="ترتيب الظهور"
              type="number"
              placeholder="أدخل الترتيب"
              error={errors.DisplayOrder?.message}
              {...register("DisplayOrder", { valueAsNumber: true })}
            />
          </div>

          <div className={styles.switchRow}>
            <label className={styles.switchLabel}>حالة البنر</label>

            <button
              type="button"
              className={`${styles.switchBtn} ${
                isActive ? styles.switchActive : ""
              }`}
              onClick={() =>
                setValue("IsActive", !isActive, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
            >
              {isActive ? "نشط" : "غير نشط"}
            </button>
          </div>

          <div className={styles.actionRow}>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? "جاري الحفظ..." : banner ? "تحديث" : "إضافة"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default HeroBannerModal