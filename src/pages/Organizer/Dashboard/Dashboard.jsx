import { useEffect, useState } from "react";
import StatCard from "../../../components/Organizer/dashboard/StatCard";
import SalesBarChart from "../../../components/Organizer/dashboard/SalesBarChart";
import EventPieChart from "../../../components/Organizer/dashboard/EventPieChart";
import AttendanceLineChart from "../../../components/Organizer/dashboard/AttendanceLineChart";
import StatusList from "../../../components/Organizer/dashboard/StatusList";
import styles from "./Dashboard.module.css";

import {
  dashboardStats,
  ticketSalesByType,
  eventSales,
  attendanceSeries,
  attendanceCategories,
  eventStatusList,
} from "../../../data/dashboardMockData";

function Dashboard() {
  const [stats, setStats] = useState([]);
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [lineSeries, setLineSeries] = useState([]);
  const [lineCategories, setLineCategories] = useState([]);
  const [statusData, setStatusData] = useState([]);

  useEffect(() => {
    setStats(dashboardStats);
    setBarData(ticketSalesByType);
    setPieData(eventSales);
    setLineSeries(attendanceSeries);
    setLineCategories(attendanceCategories);
    setStatusData(eventStatusList);
  }, []);

  return (
    <div className={styles.dashboard}>
      <div className={styles.statsGrid}>
        {stats.map((item) => (
          <StatCard
            key={item.id}
            title={item.title}
            value={item.value}
            growth={item.growth}
          />
        ))}
      </div>

      <div className={styles.chartsGrid}>
        <div className={styles.chartCard}>
          <h3 className={styles.cardTitle}>المبيعات حسب نوع التذكرة</h3>
          <SalesBarChart data={barData} />
        </div>

        <div className={styles.chartCard}>
          <h3 className={styles.cardTitle}>المبيعات حسب الفعالية</h3>
          <EventPieChart data={pieData} />
        </div>

        <div className={styles.chartCard}>
          <h3 className={styles.cardTitle}>حالة الفعاليات</h3>
          <StatusList items={statusData} />
        </div>

        <div className={styles.chartCard}>
          <h3 className={styles.cardTitle}>عدد الحضور</h3>
          <AttendanceLineChart
            series={lineSeries}
            categories={lineCategories}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;