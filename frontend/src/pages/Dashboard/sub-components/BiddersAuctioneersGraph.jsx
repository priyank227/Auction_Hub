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
import { Line } from "react-chartjs-2";
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

const BiddersAuctioneersGraph = () => {
  const { totalAuctioneers, totalBidders } = useSelector(
    (state) => state.superAdmin
  );

  const data = {
    labels: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ],
    datasets: [
      {
        label: "Number of Bidders",
        data: totalBidders,
        borderColor: "#38bdf8", // sky-400
        backgroundColor: "#38bdf8",
        fill: false,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: "Number of Auctioneers",
        data: totalAuctioneers,
        borderColor: "#6366f1", // indigo-500
        backgroundColor: "#6366f1",
        fill: false,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 50,
        ticks: {
          color: "#1e293b", // slate-800
          callback: (value) => value.toLocaleString(),
        },
        grid: {
          color: "#e0f2fe", // light sky background grid
        },
      },
      x: {
        ticks: {
          color: "#1e293b",
        },
        grid: {
          color: "#e0f2fe",
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#0f172a", // slate-900
          font: {
            size: 14,
            weight: "500",
          },
        },
      },
      title: {
        display: true,
        text: "Bidders & Auctioneers Registration (Monthly)",
        font: {
          size: 18,
          weight: "bold",
        },
        color: "#1e3a8a", // blue-900
        padding: {
          top: 10,
          bottom: 30,
        },
      },
    },
  };

  return (
    <div className="w-full h-[400px] bg-gradient-to-br from-[#DBEAFE] to-[#EFF6FF] rounded-xl shadow-md p-4 border border-blue-100">
      <Line data={data} options={options} />
    </div>
  );
};

export default BiddersAuctioneersGraph;
