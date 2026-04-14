import { useEffect, useState } from "react"
import Button from "../../common/Button/Button"
import styles from "./HeroBanner.module.css"

const HeroBanner = ({ banners = [], buttonText = "احجز الآن" }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!banners.length) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [banners])

  useEffect(() => {
    if (currentIndex >= banners.length) {
      setCurrentIndex(0)
    }
  }, [banners, currentIndex])

  if (!banners.length) return null

  const currentBanner = banners[currentIndex]

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  const finalButtonText = currentBanner.buttonText || buttonText

  return (
    <section
      className={styles.hero}
      style={{ backgroundImage: `url(${currentBanner.imageUrl})` }}
    >
      <div className={styles.overlay}>
        <button
          type="button"
          className={`${styles.arrow} ${styles.prev}`}
          onClick={goToPrev}
          aria-label="السابق"
        >
          ‹
        </button>

        <div className={styles.content}>
          <h1 className={styles.title}>{currentBanner.title}</h1>
          <p className={styles.subtitle}>{currentBanner.subtitle}</p>

          <div className={styles.buttonWrapper}>
            <Button
              text={finalButtonText}
              onClick={() => {
                if (currentBanner.buttonLink) {
                  window.location.href = currentBanner.buttonLink
                }
              }}
            />
          </div>

          <div className={styles.dots}>
            {banners.map((banner, index) => (
              <button
                key={banner.id}
                type="button"
                className={`${styles.dot} ${
                  index === currentIndex ? styles.activeDot : ""
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`banner-${index + 1}`}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          className={`${styles.arrow} ${styles.next}`}
          onClick={goToNext}
          aria-label="التالي"
        >
          ›
        </button>
      </div>
    </section>
  )
}

export default HeroBanner