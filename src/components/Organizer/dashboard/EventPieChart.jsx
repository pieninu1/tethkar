import Chart from "react-apexcharts";

function EventPieChart({ data }) {
  const series = data;

  const options = {
    chart: {
      type: "donut",
      background: "transparent",
    },
    labels: ["فعالية رقم 1", "فعالية رقم 2", "فعالية رقم 3", "فعالية رقم 4"],
    legend: {
      position: "right",
      labels: {
        colors: "#d8d1c8",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: false,
    },
    colors: ["#d8c7a7", "#f0e8dd", "#b79d74", "#8b7758"],
    tooltip: {
      theme: "dark",
    },
  };

  return <Chart options={options} series={series} type="donut" height={220} />;
}

export default EventPieChart;