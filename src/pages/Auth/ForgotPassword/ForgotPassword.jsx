import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "react-router-dom"
import FormModel from "../../../components/FormModel/FormModel"
import Input from "../../../components/Input/Input"
import Button from "../../../components/Button/Button"
import { forgotPasswordSchema } from "./forgotPasswordSchema"
import styles from "./ForgotPassword.module.css"

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "all",
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (data) => {
    try {
      console.log("Reset link sent to:", data.email)
    } catch (error) {
      console.error("Error sending reset email", error)
    }
  }

  return (
    <section className={styles.page}>
      <div className={styles.wrapper}>
        <button className={styles.closeButton} type="button">
          ×
        </button>

        <div className={styles.card}>
          {/* Image Section */}
          <div className={styles.imageSection}>
            <img
              src="/images/login-image.png"
              alt="Desert"
              className={styles.image}
            />
          </div>

          {/* Form Section */}
          <div className={styles.formSection}>
            <img
              src="/images/the-logo.png"
              alt="Tethkar Logo"
              className={styles.logo}
            />

            <h3 className={styles.title}>نسيت كلمة المرور؟</h3>

            <p className={styles.subtitle}>
              أدخل بريدك الإلكتروني لإرسال رابط إعادة تعيين كلمة المرور
            </p>

            <FormModel>
              <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                
                <Input
                  type="email"
                  placeholder="البريد الإلكتروني"
                  error={errors.email?.message}
                  {...register("email")}
                />

                <Button
                  type="submit"
                  text={isSubmitting ? "جاري الإرسال..." : "إرسال رابط إعادة التعيين"}
                  disabled={isSubmitting}
                />

                <p className={styles.backText}>
                  تذكرت كلمة المرور؟{" "}
                  <Link to="/" className={styles.backLink}>
                    تسجيل الدخول
                  </Link>
                </p>

              </form>
            </FormModel>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ForgotPassword