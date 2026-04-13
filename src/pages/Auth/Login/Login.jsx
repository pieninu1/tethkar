import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router-dom"
import FormModel from "../../../components/common/FormModel/FormModel"
import Input from "../../../components/common/Input/Input"
import Button from "../../../components/common/Button/Button"
import { loginSchema } from "./loginSchema"
import styles from "./Login.module.css"
import { login } from "../../../services/AuthService"

const Login = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  const onSubmit = async (data) => {
    try {
      const response = await login({
        email: data.email,
        password: data.password,
      })

      console.log("Login response:", response)

      const token = response.token || response.Token
      const roles = response.roles || response.Roles || []

      localStorage.setItem("token", token)

      let userRole = "User"

      if (roles.includes("Admin")) {
        userRole = "Admin"
      } else if (roles.includes("Organizer")) {
        userRole = "Organizer"
      }

      localStorage.setItem("role", userRole)

      if (data.rememberMe) {
        localStorage.setItem("rememberMe", "true")
      } else {
        localStorage.removeItem("rememberMe")
      }

      if (userRole === "Admin") {
        navigate("/admin/cities")
      } else if (userRole === "Organizer") {
        navigate("/organizer/dashboard")
      } else {
        navigate("/home")
      }
    } catch (error) {
      console.error("Error logging in", error)
    }
  }

  return (
    <section className={styles.page} aria-label="تسجيل الدخول">
      <div className={styles.wrapper}>
        <button className={styles.closeButton} type="button">
          ×
        </button>

        <div className={styles.card}>
          <div className={styles.imageSection}>
            <img
              src="/images/login-image.png"
              alt="Desert building"
              className={styles.image}
            />
          </div>

          <div className={styles.formSection}>
            <img
              src="/images/the-logo.png"
              alt="Tethkar Logo"
              className={styles.logo}
            />

            <h1 className={styles.title}>تسجيل الدخول</h1>

            <FormModel>
              <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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

                <div className={styles.optionsRow}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      {...register("rememberMe")}
                    />
                    <span>تذكرني</span>
                  </label>

                  <Link to="/forgot-password" className={styles.textButton}>
                    نسيت كلمة المرور؟
                  </Link>
                </div>

                <Button
                  type="submit"
                  text={isSubmitting ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                  disabled={isSubmitting}
                />

                <p className={styles.registerText}>
                  ليس لديك حساب؟{" "}
                  <Link to="/register" className={styles.registerLink}>
                    إنشاء حساب
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

export default Login