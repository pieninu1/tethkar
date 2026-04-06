import { Link, useParams } from "react-router-dom";
import styles from "./TicketDetailPage.module.css";

function TicketDetailPage() {
  const { id } = useParams();

  const ticket = {
    id,
    title: "معرض البيانات",
    date: "1 مارس",
    orderNumber: "3423321",
    image: "/images/full-ticket.png",
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.brand}>تذكار</div>
        <Link to="/tickets" className={styles.backLink}>
          ←
        </Link>
      </div>

      <h1 className={styles.title}>تفاصيل التذكرة</h1>

      <div className={styles.ticketWrapper}>
        <img
          src={ticket.image}
          alt={ticket.title}
          className={styles.ticketImage}
        />
      </div>

      <div className={styles.infoBox}>
        <div className={styles.infoRow}>
          <span className={styles.label}>اسم الحدث</span>
          <span className={styles.value}>{ticket.title}</span>
        </div>

        <div className={styles.infoRow}>
          <span className={styles.label}>التاريخ</span>
          <span className={styles.value}>{ticket.date}</span>
        </div>

        <div className={styles.infoRow}>
          <span className={styles.label}>رقم الطلب</span>
          <span className={styles.value}>{ticket.orderNumber}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.secondaryButton}>مشاركة</button>
        <button className={styles.primaryButton}>تنزيل</button>
      </div>
    </div>
  );
}

export default TicketDetailPage;