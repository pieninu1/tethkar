import { useState } from "react"
import { FiEye, FiEyeOff } from "react-icons/fi"
import styles from "./Input.module.css"

const Input = ({
  type = "text",
  label,
  placeholder,
  className,
  error,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const isPassword = type === "password"

  return (
    <div className={`${styles.inputContainer} ${className || ""}`}>
      
      {/* Optional label */}
      {label && <label className={styles.label}>{label}</label>}

      <div className={styles.inputWrapper}>
        <input
          type={isPassword && showPassword ? "text" : type}
          placeholder={placeholder}
          className={`${styles.input} ${error ? styles.inputError : ""}`}
          {...props}
        />

        {isPassword && (
          <span
            className={styles.eyeIcon}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        )}
      </div>

      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  )
}

export default Input