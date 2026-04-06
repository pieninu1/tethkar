import styles from "./SectionTitle.module.css"

const SectionTitle = ({ title, actionText }) => {
  return (
    <div className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
      <button className={styles.action}>{actionText}</button>
    </div>
  )
}

export default SectionTitle