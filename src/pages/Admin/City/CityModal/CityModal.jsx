import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "../../../../components/common/Modal/Modal";
import Input from "../../../../components/common/Input/Input";
import { citySchema } from "../CitySchema";
import styles from "./CityModal.module.css";

const CityModal = ({ isOpen, onClose, city, onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(citySchema),
    mode: "all",
    defaultValues: {
      Name: "",
      ImageUrl: "",
      Id: undefined,
    },
  });

  useEffect(() => {
    if (!isOpen) return;

    reset(
      city
        ? {
            Name: city.name || "",
            ImageUrl: city.imageUrl || "",
            Id: city.id,
          }
        : {
            Name: "",
            ImageUrl: "",
            Id: undefined,
          }
    );
  }, [isOpen, city, reset]);

  const handleFormSubmit = async (data) => {
    try {
      await onSubmit({
        Name: data.Name,
        ImageUrl: data.ImageUrl,
        Id: city?.id,
      });
    } catch (error) {
      console.error("Error submitting city", error);
    }
  };

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
            {city ? "تعديل مدينة" : "إضافة مدينة جديدة"}
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
              label="اسم المدينة"
              type="text"
              placeholder="أدخل اسم المدينة"
              error={errors.Name?.message}
              {...register("Name")}
            />
          </div>

          <div className={styles.field}>
            <Input
              label="رابط صورة المدينة"
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
              {isSubmitting ? "جاري الحفظ..." : city ? "تحديث" : "إضافة"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CityModal;