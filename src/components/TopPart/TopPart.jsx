import styles from "./TopPart.module.css"

const TopPart = ({ title, children }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <div>{children}</div>
    </div>
  )
}

export default TopPart