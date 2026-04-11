import styles from "./SectionTitle.module.css"

const SectionTitle = ({ title, actionText, onActionClick }) => {
  return (
    <div className={styles.header}>
      <h2 className={styles.title}>{title}</h2>

      {actionText && (
        <button
          type="button"
          className={styles.action}
          onClick={onActionClick}
        >
          {actionText}
        </button>
      )}
    </div>
  )
}

export default SectionTitle