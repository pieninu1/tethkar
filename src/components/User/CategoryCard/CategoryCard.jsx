import styles from "./CategoryCard.module.css"

const CategoryCard = ({ title, image }) => {
  return (
    <div className={styles.card}>
      <img src={image} alt={title} className={styles.image} />
      <p className={styles.title}>{title}</p>
    </div>
  )
}

export default CategoryCard