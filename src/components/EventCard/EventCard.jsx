import { useNavigate } from "react-router-dom"
import styles from "./EventCard.module.css"

const EventCard = ({ id, title, subtitle, date, location, price, image }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/tickets/${id}`)
  }

  return (
    <div className={styles.card} onClick={handleClick}>
      <img src={image} alt={title} className={styles.image} />

      <div className={styles.content}>
        <p className={styles.type}>{subtitle}</p>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.meta}>
          {date}
          <span className={styles.dot}>•</span>
          {location}
        </p>

        <div className={styles.priceRow}>
          <span className={styles.priceLabel}>يبدأ من</span>
          <span className={styles.priceValue}>{price}</span>
          <img src="/images/riyal.svg" alt="ريال" className={styles.currencyIcon} />
        </div>
      </div>
    </div>
  )
}

export default EventCard