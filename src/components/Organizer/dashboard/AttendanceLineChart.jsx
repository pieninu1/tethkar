import Chart from "react-apexcharts";

function AttendanceLineChart({ series, categories }) {
  const options = {
    chart: {
      toolbar: { show: false },
      background: "transparent",
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      categories,
      labels: {
        style: {
          colors: "#d8d1c8",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#d8d1c8",
        },
      },
    },
    legend: {
      labels: {
        colors: "#d8d1c8",
      },
    },
    grid: {
      borderColor: "rgba(255,255,255,0.08)",
    },
    colors: ["#E4D9C9", "#9e8a6c"],
    tooltip: {
      theme: "dark",
    },
  };

  return <Chart options={options} series={series} type="line" height={220} />;
}

export default AttendanceLineChart;