import styles from "./StatCard.module.css";

function StatCard({ title, value, growth }) {
  return (
    <div className={styles.card}>
      <p className={styles.title}>{title}</p>
      <div className={styles.valueRow}>
        <h3 className={styles.value}>{value}</h3>
        {growth && <span className={styles.growth}>{growth}</span>}
      </div>
    </div>
  );
}

export default StatCard;