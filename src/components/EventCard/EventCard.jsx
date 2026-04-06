import { useNavigate } from "react-router-dom"
import styles from "./EventCard.module.css"

const EventCard = ({ id, title, subtitle, date, image }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/tickets/${id}`)
  }

  return (
    <div className={styles.card} onClick={handleClick}>
      <img src={image} alt={title} className={styles.image} />

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.subtitle}>{subtitle}</p>
        <span className={styles.date}>{date}</span>
      </div>
    </div>
  )
}

export default EventCard