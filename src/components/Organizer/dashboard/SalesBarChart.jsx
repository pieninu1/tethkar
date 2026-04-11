import Chart from "react-apexcharts";

function SalesBarChart({ data }) {
  const series = [
    {
      name: "المبيعات",
      data: data.map((item) => item.value),
    },
  ];

  const options = {
    chart: {
      toolbar: { show: false },
      background: "transparent",
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: "45%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: data.map((item) => item.name),
      labels: {
        style: {
          colors: "#d8d1c8",
          fontSize: "12px",
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
    grid: {
      borderColor: "rgba(255,255,255,0.08)",
    },
    colors: ["#E4D9C9"],
    tooltip: {
      theme: "dark",
    },
  };

  return <Chart options={options} series={series} type="bar" height={220} />;
}

export default SalesBarChart;