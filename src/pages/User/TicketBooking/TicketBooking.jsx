import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../../components/User/Navbar/Navbar";
import Footer from "../../../components/common/Footer/Footer";
import { getEventById } from "../../../services/EventService";
import { getTicketTypesByEventId } from "../../../services/TicketTypeService";
import { bookTicket } from "../../../services/TicketService";
import styles from "./TicketBooking.module.css";

function TicketBooking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [ticketTypes, setTicketTypes] = useState([]);
  const [selectedTicketTypeId, setSelectedTicketTypeId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventData, ticketTypesData] = await Promise.all([
          getEventById(id),
          getTicketTypesByEventId(id),
        ]);

        setEvent(eventData);
        setTicketTypes(ticketTypesData || []);

        if (ticketTypesData?.length > 0) {
          setSelectedTicketTypeId(String(ticketTypesData[0].id));
        }
      } catch (error) {
        console.error("Error loading booking page:", error);
        setMessage("حدث خطأ أثناء تحميل بيانات الحجز.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const availableDates = useMemo(() => {
    if (!event?.startDateTime || !event?.endDateTime) return [];

    const dates = [];
    const current = new Date(event.startDateTime);
    const end = new Date(event.endDateTime);

    current.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    while (current <= end) {
      dates.push(new Date(current).toISOString().split("T")[0]);
      current.setDate(current.getDate() + 1);
    }

    return dates;
  }, [event]);

  useEffect(() => {
    if (availableDates.length > 0 && !selectedDate) {
      setSelectedDate(availableDates[0]);
    }
  }, [availableDates, selectedDate]);

  const selectedTicketType = ticketTypes.find(
    (ticketType) => String(ticketType.id) === String(selectedTicketTypeId)
  );

  const totalPrice = selectedTicketType
    ? Number(selectedTicketType.price) * Number(quantity)
    : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedTicketTypeId || !selectedDate || quantity < 1) {
      setMessage("يرجى تعبئة جميع الحقول بشكل صحيح.");
      return;
    }

    try {
      setSubmitting(true);
      setMessage("");

      const response = await bookTicket({
        ticketTypeId: Number(selectedTicketTypeId),
        eventDate: selectedDate,
        quantity: Number(quantity),
      });

      if (typeof response === "string") {
        if (response.includes("تم حجز")) {
          setMessage("تم حجز التذكرة بنجاح.");
          setTimeout(() => {
            navigate("/tickets");
          }, 1000);
          return;
        }

        setMessage(response);
        return;
      }

      setMessage("تم حجز التذكرة بنجاح.");
      setTimeout(() => {
        navigate("/tickets");
      }, 1000);
    } catch (error) {
      console.error("Booking error:", error);
      setMessage("تعذر إتمام الحجز.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.page} dir="rtl">
        <Navbar />
        <div className={styles.container}>جاري تحميل صفحة الحجز...</div>
        <Footer />
      </div>
    );
  }

  if (!event) {
    return (
      <div className={styles.page} dir="rtl">
        <Navbar />
        <div className={styles.container}>لم يتم العثور على الفعالية.</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.page} dir="rtl">
      <Navbar />

      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>حجز التذاكر</h1>
            <p className={styles.eventName}>{event.name}</p>
          </div>

          <div className={styles.summary}>
            <img
              src={event.cardImageUrl}
              alt={event.name}
              className={styles.image}
            />

            <div className={styles.summaryInfo}>
              <p>
                <strong>الموقع:</strong> {event.city?.name || event.venue}
              </p>
              <p>
                <strong>الفترة:</strong>{" "}
                {new Date(event.startDateTime).toLocaleDateString("ar-SA")} -{" "}
                {new Date(event.endDateTime).toLocaleDateString("ar-SA")}
              </p>
            </div>
          </div>

          {ticketTypes.length === 0 ? (
            <div className={styles.emptyState}>
              لا توجد أنواع تذاكر متاحة لهذه الفعالية حالياً.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.label}>نوع التذكرة</label>
                <select
                  className={styles.select}
                  value={selectedTicketTypeId}
                  onChange={(e) => setSelectedTicketTypeId(e.target.value)}
                >
                  {ticketTypes.map((ticketType) => (
                    <option key={ticketType.id} value={ticketType.id}>
                      {ticketType.name} - {ticketType.price} ر.س
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>اليوم المتاح</label>
                <select
                  className={styles.select}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                >
                  {availableDates.map((date) => (
                    <option key={date} value={date}>
                      {new Date(date).toLocaleDateString("ar-SA")}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>الكمية</label>
                <input
                  type="number"
                  min="1"
                  max={selectedTicketType?.quantity || 1}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className={styles.input}
                />
              </div>

              <div className={styles.totalBox}>
                <span>الإجمالي</span>
                <strong>{totalPrice} ر.س</strong>
              </div>

              {message && <p className={styles.message}>{message}</p>}

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={submitting}
              >
                {submitting ? "جارٍ تأكيد الحجز..." : "تأكيد الحجز"}
              </button>
            </form>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default TicketBooking;