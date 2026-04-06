import styles from "./SectionCard.module.css"

const SectionCard = ({ title, actionText, children }) => {
  return (
    <div className={styles.card}>
      <div className={styles.topRow}>
        <h2 className={styles.title}>{title}</h2>
        {actionText && <button className={styles.action}>{actionText}</button>}
      </div>

      <div className={styles.body}>{children}</div>
    </div>
  )
}

export default SectionCard