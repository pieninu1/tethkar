import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import styles from "./ForgotPassword.module.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    general: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      email: "",
      general: "",
    };

    if (!email.trim()) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    }

    if (newErrors.email) {
      setErrors(newErrors);
      return;
    }

    setErrors({
      email: "",
      general: "",
    });

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <div className={styles.page}>
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

            <h1 className={styles.title}>نسيت كلمة المرور؟</h1>
            <p className={styles.description}>
              أدخل بريدك الإلكتروني لإرسال رابط إعادة تعيين كلمة المرور
            </p>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                  <Input
                    type="email"
                    placeholder="أدخل البريد الإلكتروني"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors((prev) => ({
                        ...prev,
                        email: "",
                        general: "",
                      }));
                    }}
                  />
                  {errors.email && (
                    <span className={styles.errorText}>{errors.email}</span>
                  )}
                </div>

                {errors.general && (
                  <p className={styles.generalError}>{errors.general}</p>
                )}

                <Button
                  type="submit"
                  fullWidth
                  loading={loading}
                  disabled={loading}
                >
                  إرسال رابط إعادة التعيين
                </Button>

                <p className={styles.backText}>
                  تذكرت كلمة المرور؟{" "}
                  <Link to="/" className={styles.backLink}>
                    تسجيل الدخول
                  </Link>
                </p>
              </form>
            ) : (
              <div className={styles.successBox}>
                <p className={styles.successMessage}>
                  تم إرسال رابط إعادة التعيين إلى بريدك الإلكتروني
                </p>

                <Link to="/" className={styles.backButtonLink}>
                  <Button type="button" fullWidth>
                    العودة إلى تسجيل الدخول
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;