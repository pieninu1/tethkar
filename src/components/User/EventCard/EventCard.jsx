import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { RiHeart3Fill, RiHeart3Line } from "react-icons/ri"
import { toggleFavorite } from "../../../services/UserFavoriteService"
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
  showDate = true,
  showPrice = true,
  initialIsFavorite = false,
  onFavoriteChange,
}) => {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite)
  const [favoriteLoading, setFavoriteLoading] = useState(false)
  const [toastMessage, setToastMessage] = useState("")

  useEffect(() => {
    setIsFavorite(initialIsFavorite)
  }, [initialIsFavorite])

  const cardClassName =
    variant === "compact"
      ? `${styles.card} ${styles.compactCard}`
      : styles.card

  const targetPath = detailsPath || `/event/${id}`

  const formatArabicNumber = (value) => {
    if (value === null || value === undefined || value === "") return ""
    return new Intl.NumberFormat("ar-SA").format(value)
  }

  const showToast = (message) => {
    setToastMessage(message)
    window.clearTimeout(window.__favoriteToastTimer)
    window.__favoriteToastTimer = window.setTimeout(() => {
      setToastMessage("")
    }, 1800)
  }

  const handleFavoriteClick = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (favoriteLoading) return

    try {
      setFavoriteLoading(true)
      const result = await toggleFavorite(id)
      setIsFavorite(result)

      if (result) {
        showToast("تمت الإضافة إلى المفضلة")
      } else {
        showToast("تمت الإزالة من المفضلة")
      }

      onFavoriteChange?.(id, result)
    } catch (error) {
      console.error("Error toggling favorite", error)
      showToast("حدث خطأ أثناء تحديث المفضلة")
    } finally {
      setFavoriteLoading(false)
    }
  }

  return (
    <>
      <Link to={targetPath} className={cardClassName}>
        <div className={styles.imageWrapper}>
          <img src={image} alt={title} className={styles.image} />

          <button
            type="button"
            className={`${styles.favoriteBtn} ${
              isFavorite ? styles.favoriteBtnActive : ""
            }`}
            aria-label={isFavorite ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
            onClick={handleFavoriteClick}
            disabled={favoriteLoading}
          >
            {isFavorite ? (
              <RiHeart3Fill className={`${styles.favoriteIcon} ${styles.filled}`} />
            ) : (
              <RiHeart3Line className={styles.favoriteIcon} />
            )}
          </button>
        </div>

        <div className={styles.content}>
          {subtitle ? <p className={styles.type}>{subtitle}</p> : null}

          <h3 className={styles.title}>{title}</h3>

          {showDate && (date || location) ? (
            <p className={styles.meta}>
              {date}
              {date && location ? <span className={styles.dot}>•</span> : null}
              {location}
            </p>
          ) : null}

          {showPrice ? (
            price !== null && price !== undefined ? (
              <div className={styles.priceRow}>
                <span className={styles.priceLabel}>يبدأ من</span>

                <span className={styles.priceGroup}>
                  <span className={styles.priceValue}>
                    {formatArabicNumber(price)}
                  </span>

                  <img
                    src="/images/riyal.svg"
                    alt="ريال"
                    className={styles.currencyIcon}
                  />
                </span>
              </div>
            ) : (
              <div className={styles.priceRow}>
                <span className={styles.priceLabel}>قريباً</span>
              </div>
            )
          ) : null}
        </div>
      </Link>

      {toastMessage ? <div className={styles.toast}>{toastMessage}</div> : null}
    </>
  )
}

export default EventCard