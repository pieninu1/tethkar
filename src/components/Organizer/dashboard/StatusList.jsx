import styles from "../../../pages/Organizer/Dashboard/Dashboard.module.css";

function StatusList({ items }) {
  const getStatusClass = (status) => {
    if (status === "مكتمل") return styles.completed;
    if (status === "نشط") return styles.active;
    if (status === "قادم") return styles.upcoming;
    return "";
  };

  return (
    <div className={styles.statusWrapper}>
      {items.map((item, index) => (
        <div key={index} className={styles.statusRow}>
          <span className={styles.eventName}>{item.name}</span>
          <span className={`${styles.badge} ${getStatusClass(item.status)}`}>
            {item.status}
          </span>
        </div>
      ))}
    </div>
  );
}

export default StatusList;