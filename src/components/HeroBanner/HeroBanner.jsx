import Button from "../Button/Button"
import styles from "./HeroBanner.module.css"

const HeroBanner = ({ title, subtitle, image, buttonText }) => {
  return (
    <section
      className={styles.hero}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
          <div className={styles.buttonWrapper}>
            <Button text={buttonText} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroBanner