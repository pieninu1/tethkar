import styles from "./InfoRow.module.css"

const InfoRow = ({ label, value }) => {
  return (
    <div className={styles.row}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
    </div>
  )
}

export default InfoRow