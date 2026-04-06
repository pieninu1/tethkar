import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router-dom"
import FormModel from "../../../components/FormModel/FormModel"
import Input from "../../../components/Input/Input"
import Button from "../../../components/Button/Button"
import { registerSchema } from "./registerSchema"
import styles from "./Register.module.css"

const Register = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "all",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (data) => {
    try {
      console.log(data)

      await new Promise((resolve) => setTimeout(resolve, 1200))

      localStorage.setItem("token", "dummy-token")
      navigate("/home")
    } catch (error) {
      console.error("Error registering", error)
    }
  }

  return (
    <section className={styles.page} aria-label="إنشاء حساب">
      <div className={styles.wrapper}>
        <button className={styles.closeButton} type="button">
          ×
        </button>

        <div className={styles.card}>
          <div className={styles.formSection}>
            <img
              src="/images/the-logo.png"
              alt="Tethkar Logo"
              className={styles.logo}
            />

            <h1 className={styles.title}>إنشاء حساب</h1>

            <FormModel>
              <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.nameRow}>
                  <Input
                    type="text"
                    placeholder="الاسم الأول"
                    error={errors.firstName?.message}
                    {...register("firstName")}
                  />

                  <Input
                    type="text"
                    placeholder="الاسم الأخير"
                    error={errors.lastName?.message}
                    {...register("lastName")}
                  />
                </div>

                <Input
                  type="email"
                  placeholder="البريد الإلكتروني"
                  error={errors.email?.message}
                  {...register("email")}
                />

                <Input
                  type="password"
                  placeholder="كلمة المرور"
                  error={errors.password?.message}
                  {...register("password")}
                />

                <Input
                  type="password"
                  placeholder="تأكيد كلمة المرور"
                  error={errors.confirmPassword?.message}
                  {...register("confirmPassword")}
                />

                <Button
                  type="submit"
                  text={isSubmitting ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
                  disabled={isSubmitting}
                />

                <p className={styles.loginText}>
                  لديك حساب بالفعل؟{" "}
                  <Link to="/" className={styles.loginLink}>
                    تسجيل الدخول
                  </Link>
                </p>
              </form>
            </FormModel>
          </div>

          <div className={styles.imageSection}>
            <img
              src="/images/login-image.png"
              alt="Desert building"
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register