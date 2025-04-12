import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

const PaymentGraph = () => {
  const { monthlyRevenue } = useSelector((state) => state.superAdmin);

  const data = {
    labels: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ],
    datasets: [
      {
        label: "Total Payment Received",
        data: monthlyRevenue,
        backgroundColor: "#38bdf8", // sky-400
        borderRadius: 6,
        barThickness: 24,
        maxBarThickness: 28,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 5000,
        ticks: {
          callback: (value) => "₹" + value.toLocaleString(),
          color: "#0f172a", // slate-900
        },
        grid: {
          color: "#e0f2fe", // light sky tone
        },
      },
      x: {
        ticks: {
          color: "#0f172a",
        },
        grid: {
          color: "#e0f2fe",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "#1e3a8a", // blue-900
          font: {
            size: 14,
            weight: "500",
          },
        },
      },
      title: {
        display: true,
        text: "Monthly Total Payments Received",
        color: "#1e3a8a",
        font: {
          size: 18,
          weight: "bold",
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return "₹" + context.formattedValue;
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-[400px] bg-gradient-to-br from-[#DBEAFE] to-[#EFF6FF] rounded-xl shadow-md p-4 border border-blue-100">
      <Bar data={data} options={options} />
    </div>
  );
};

export default PaymentGraph;
