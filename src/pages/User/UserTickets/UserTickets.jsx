import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../../../components/User/Navbar/Navbar"
import Footer from "../../../components/common/Footer/Footer"
import ProfileSidebar from "../../../components/User/ProfileSidebar/ProfileSidebar"
import Button from "../../../components/common/Button/Button"
import { getMyTickets } from "../../../services/TicketService"
import { getProfile } from "../../../services/AuthService"
import styles from "./UserTickets.module.css"

function UserTickets() {
  const navigate = useNavigate()
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ticketsData, profileData] = await Promise.all([
          getMyTickets(),
          getProfile(),
        ])

        setTickets(Array.isArray(ticketsData) ? ticketsData : [])
        setUser(profileData)
      } catch (error) {
        console.error("Error fetching user tickets/profile:", error)
        setTickets([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const activeTickets = useMemo(() => {
    return tickets.filter((ticket) => ticket.status === "Active")
  }, [tickets])

  const expiredTickets = useMemo(() => {
    return tickets.filter((ticket) => ticket.status === "Expired")
  }, [tickets])

  const mapTicketForUi = (ticket) => ({
    id: ticket.ticketId,
    title: ticket.eventName,
    organizer: ticket.ticketTypeName,
    description: `موعد الفعالية: ${new Date(ticket.eventDate).toLocaleDateString(
      "ar-SA"
    )} - المدينة: ${ticket.cityName}`,
    image: ticket.cardImageUrl || "/images/login-image.png",
    buttonText: "تنزيل التذكرة",
    buttonDisabled: ticket.status === "Expired",
    raw: ticket,
  })

  if (loading) {
    return (
      <div className={styles.page} dir="rtl">
        <div className={styles.container}>
          <Navbar />
          <main className={styles.mainContent}>
            <ProfileSidebar activeItem="tickets" user={user} />
            <section className={styles.leftSection}>
              <div className={styles.sectionBlock}>جاري تحميل التذاكر...</div>
            </section>
          </main>
          <Footer />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page} dir="rtl">
      <div className={styles.container}>
        <Navbar />

        <main className={styles.mainContent}>
          <ProfileSidebar activeItem="tickets" user={user} />

          <section className={styles.leftSection}>
            <div className={styles.sectionBlock}>
              <h2 className={styles.sectionTitle}>التذاكر النشطة</h2>

              {activeTickets.length === 0 ? (
                <div className={styles.emptyState}>
                  لا توجد تذاكر نشطة حالياً.
                </div>
              ) : (
                activeTickets.map((ticket) => {
                  const uiTicket = mapTicketForUi(ticket)

                  return (
                    <div key={uiTicket.id} className={styles.ticketCard}>
                      <div className={styles.ticketImageWrapper}>
                        <img
                          src={uiTicket.image}
                          alt={uiTicket.title}
                          className={styles.ticketImage}
                        />
                      </div>

                      <div className={styles.ticketContent}>
                        <div className={styles.ticketHeader}>
                          <h3 className={styles.ticketTitle}>{uiTicket.title}</h3>
                          <p className={styles.ticketOrganizer}>
                            {uiTicket.organizer}
                          </p>
                        </div>

                        <p className={styles.ticketDescription}>
                          {uiTicket.description}
                        </p>
                      </div>

                      <div className={styles.ticketActions}>
                        <button
                          className={styles.detailsLink}
                          onClick={() => navigate(`/event/${ticket.eventId}`)}
                        >
                          عرض التفاصيل
                        </button>

                        <div className={styles.downloadBtnWrapper}>
                          <Button
                            text={uiTicket.buttonText}
                            disabled={uiTicket.buttonDisabled}
                            className={styles.downloadBtn}
                            onClick={() =>
                              console.log("Download active ticket:", uiTicket.raw)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            <div className={styles.sectionBlock}>
              <h2 className={styles.sectionTitle}>التذاكر المنتهية</h2>

              {expiredTickets.length === 0 ? (
                <div className={styles.emptyState}>لا توجد تذاكر منتهية.</div>
              ) : (
                expiredTickets.map((ticket) => {
                  const uiTicket = mapTicketForUi(ticket)

                  return (
                    <div key={uiTicket.id} className={styles.ticketCard}>
                      <div className={styles.ticketImageWrapper}>
                        <img
                          src={uiTicket.image}
                          alt={uiTicket.title}
                          className={styles.ticketImage}
                        />
                      </div>

                      <div className={styles.ticketContent}>
                        <div className={styles.ticketHeader}>
                          <h3 className={styles.ticketTitle}>{uiTicket.title}</h3>
                          <p className={styles.ticketOrganizer}>
                            {uiTicket.organizer}
                          </p>
                        </div>

                        <p className={styles.ticketDescription}>
                          {uiTicket.description}
                        </p>
                      </div>

                      <div className={styles.ticketActions}>
                        <button
                          className={styles.detailsLink}
                          onClick={() => navigate(`/event/${ticket.eventId}`)}
                        >
                          عرض التفاصيل
                        </button>

                        <div className={styles.downloadBtnWrapper}>
                          <Button
                            text={uiTicket.buttonText}
                            disabled={uiTicket.buttonDisabled}
                            className={styles.expiredBtn}
                            onClick={() =>
                              console.log("Expired ticket:", uiTicket.raw)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default UserTickets