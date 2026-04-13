import { Link } from "react-router-dom"
import { HiOutlineHeart } from "react-icons/hi"
import styles from "./EventCard.module.css"

const EventCard = ({
  id,
  title,
  subtitle,
  date,
  location,
  price,
  image,
  variant = "default",
  detailsPath,
}) => {
  const cardClassName =
    variant === "compact"
      ? `${styles.card} ${styles.compactCard}`
      : styles.card

  const targetPath = detailsPath || `/event/${id}`

  return (
    <Link to={targetPath} className={cardClassName}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} className={styles.image} />

        <button
          type="button"
          className={styles.favoriteBtn}
          aria-label="إزالة من المفضلة"
          onClick={(e) => e.preventDefault()}
        >
          <HiOutlineHeart className={styles.favoriteIcon} />
        </button>
      </div>

      <div className={styles.content}>
        {subtitle ? <p className={styles.type}>{subtitle}</p> : null}

        <h3 className={styles.title}>{title}</h3>

        <p className={styles.meta}>
          {date}
          {location ? <span className={styles.dot}>•</span> : null}
          {location}
        </p>

        {price ? (
          <div className={styles.priceRow}>
            <span className={styles.priceLabel}>يبدأ من</span>
            <span className={styles.priceValue}>{price}</span>
            <img
              src="/images/riyal.svg"
              alt="ريال"
              className={styles.currencyIcon}
            />
          </div>
        ) : null}
      </div>
    </Link>
  )
}

export default EventCard