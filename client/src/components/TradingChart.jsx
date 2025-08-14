import React, { useEffect, useRef, useState } from "react";

const TradingChart = ({ data, title, type = "line" }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [chartJsLoaded, setChartJsLoaded] = useState(false);

  // Dynamically load Chart.js
  useEffect(() => {
    if (window.Chart) {
      setChartJsLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js";
    script.onload = () => setChartJsLoaded(true);
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // Initialize chart when Chart.js and data are ready
  useEffect(() => {
    if (!chartJsLoaded || !window.Chart || !data) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    chartInstance.current = new window.Chart(ctx, {
      type,
      data: {
        labels: data.map((d) => d.date || d.time),
        datasets: [
          {
            label: title,
            data: data.map((d) => d.cumulative || d.price || d.volume),
            borderColor: type === "line" ? "#10b981" : "#f97316",
            backgroundColor:
              type === "line"
                ? "rgba(16, 185, 129, 0.1)"
                : type === "bar"
                ? "rgba(249, 115, 22, 0.8)"
                : "rgba(16, 185, 129, 0.2)",
            borderWidth: type === "line" ? 3 : 1,
            fill: type === "line",
            tension: 0.4,
            pointBackgroundColor: "#10b981",
            pointBorderColor: "#ffffff",
            pointBorderWidth: 2,
            pointRadius: type === "line" ? 6 : 0,
            pointHoverRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#ffffff",
            titleColor: "#000000",
            bodyColor: "#000000",
            borderColor: "#f97316",
            borderWidth: 1,
            cornerRadius: 8,
            callbacks: {
              label: function (context) {
                const value = context.parsed.y;
                if (type === "bar") return `Volume: ${value.toLocaleString()}`;
                return `${title}: $${value.toLocaleString()}`;
              },
            },
          },
        },
        scales: {
          x: {
            grid: { color: "#e5e7eb" }, // Light gray grid
            ticks: { color: "#374151", font: { size: 12 } }, // Dark text
          },
          y: {
            grid: { color: "#e5e7eb" },
            ticks: {
              color: "#374151",
              font: { size: 12 },
              callback: (value) =>
                type === "bar"
                  ? value.toLocaleString()
                  : "$" + value.toLocaleString(),
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) chartInstance.current.destroy();
    };
  }, [chartJsLoaded, data, title, type]);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <span className="text-orange-500 mr-2">📈</span>
        {title}
      </h3>
      <div className="relative h-64">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default TradingChart;
