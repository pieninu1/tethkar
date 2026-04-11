import styles from "./Modal.module.css"

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  className = "",
  bodyClassName = "",
  hideHeader = false,
}) => {
  if (!isOpen) return null

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
      onClick={onClose}
    >
      <div
        className={`${styles.modal} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {!hideHeader && (
          <div className={styles.head}>
            <h2 id="modal-title" className={styles.title}>
              {title}
            </h2>

            <button
              type="button"
              onClick={onClose}
              className={styles.closeBtn}
              aria-label="إغلاق"
            >
              ×
            </button>
          </div>
        )}

        <div className={`${styles.body} ${bodyClassName}`}>{children}</div>
      </div>
    </div>
  )
}

export default Modal