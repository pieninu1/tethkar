import styles from "./CityCard.module.css"

const CityCard = ({ title, image }) => {
  return (
    <div className={styles.card}>
      <img src={image} alt={title} className={styles.image} />
      <p className={styles.title}>{title}</p>
    </div>
  )
}

export default CityCard