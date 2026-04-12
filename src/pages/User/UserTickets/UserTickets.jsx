import Navbar from "../../../components/User/Navbar/Navbar"
import Footer from "../../../components/common/Footer/Footer"
import ProfileSidebar from "../../../components/User/ProfileSidebar/ProfileSidebar"
import Button from "../../../components/common/Button/Button"
import styles from "./UserTickets.module.css"

function UserTickets() {
  const activeTickets = [
    {
      id: 1,
      title: "معرض بدايات",
      organizer: "جمعية الثقافة والفنون بالدمام",
      description:
        "معرض فني يحتفي بإرث العمق التاريخي والثقافي للمملكة العربية السعودية من خلال أعمال تشكيلية مقتبسة من تراث المدن.",
      image: "/images/ticket-1.png",
      buttonText: "تنزيل التذكرة",
      buttonDisabled: false,
    },
  ]

  const expiredTickets = [
    {
      id: 2,
      title: "مهرجان الفنون",
      organizer: "وزارة الثقافة",
      description:
        "يحتفي مهرجان الفنون التقليدية بإرث المملكة الفني من خلال تجربة تجمع الحرف الموسيقية والإيقاعات التقليدية من مختلف مناطق المملكة.",
      image: "/images/ticket-2.png",
      buttonText: "تنزيل التذكرة",
      buttonDisabled: true,
    },
  ]

  console.log("Active Tickets:", activeTickets)
  console.log("Expired Tickets:", expiredTickets)

  return (
    <div className={styles.page} dir="rtl">
      <div className={styles.container}>
        <Navbar />

        <main className={styles.mainContent}>
          <ProfileSidebar activeItem="tickets" />

          <section className={styles.leftSection}>
            <div className={styles.sectionBlock}>
              <h2 className={styles.sectionTitle}>التذاكر النشطة</h2>

              {activeTickets.map((ticket) => {
                console.log("Single Active Ticket:", ticket)

                return (
                  <div key={ticket.id} className={styles.ticketCard}>
                    <div className={styles.ticketImageWrapper}>
                      <img
                        src={ticket.image}
                        alt={ticket.title}
                        className={styles.ticketImage}
                      />
                    </div>

                    <div className={styles.ticketContent}>
                      <div className={styles.ticketHeader}>
                        <h3 className={styles.ticketTitle}>{ticket.title}</h3>
                        <p className={styles.ticketOrganizer}>{ticket.organizer}</p>
                      </div>

                      <p className={styles.ticketDescription}>
                        {ticket.description}
                      </p>
                    </div>

                    <div className={styles.ticketActions}>
                      <button
                        className={styles.detailsLink}
                        onClick={() => console.log("View details for:", ticket)}
                      >
                        عرض التفاصيل
                      </button>

                      <div className={styles.downloadBtnWrapper}>
                        <Button
                          text={ticket.buttonText}
                          disabled={ticket.buttonDisabled}
                          className={styles.downloadBtn}
                          onClick={() =>
                            console.log("Sending active ticket to backend:", ticket)
                          }
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className={styles.sectionBlock}>
              <h2 className={styles.sectionTitle}>التذاكر المنتهية</h2>

              {expiredTickets.map((ticket) => {
                console.log("Single Expired Ticket:", ticket)

                return (
                  <div key={ticket.id} className={styles.ticketCard}>
                    <div className={styles.ticketImageWrapper}>
                      <img
                        src={ticket.image}
                        alt={ticket.title}
                        className={styles.ticketImage}
                      />
                    </div>

                    <div className={styles.ticketContent}>
                      <div className={styles.ticketHeader}>
                        <h3 className={styles.ticketTitle}>{ticket.title}</h3>
                        <p className={styles.ticketOrganizer}>{ticket.organizer}</p>
                      </div>

                      <p className={styles.ticketDescription}>
                        {ticket.description}
                      </p>
                    </div>

                    <div className={styles.ticketActions}>
                      <button
                        className={styles.detailsLink}
                        onClick={() => console.log("View details for:", ticket)}
                      >
                        عرض التفاصيل
                      </button>

                      <div className={styles.downloadBtnWrapper}>
                        <Button
                          text={ticket.buttonText}
                          disabled={ticket.buttonDisabled}
                          className={styles.expiredBtn}
                          onClick={() =>
                            console.log("Sending expired ticket to backend:", ticket)
                          }
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default UserTickets