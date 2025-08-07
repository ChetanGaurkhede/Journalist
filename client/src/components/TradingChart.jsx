import React, { useEffect, useRef } from "react";

const TradingChart = ({ data, title, chartJsLoaded, type = "line" }) => {

  
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartJsLoaded || !window.Chart || !data) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    const config = {
      type: type,
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
            pointBorderColor: "#1f2937",
            pointBorderWidth: 2,
            pointRadius: type === "line" ? 6 : 0,
            pointHoverRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        backgroundColor: "#1f2937",
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            titleColor: "#f97316",
            bodyColor: "#ffffff",
            borderColor: "#f97316",
            borderWidth: 1,
            cornerRadius: 8,
            callbacks: {
              label: function (context) {
                const value = context.parsed.y;
                if (type === "bar") {
                  return `Volume: ${value.toLocaleString()}`;
                }
                return `${title}: $${value.toLocaleString()}`;
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              color: "#374151",
              borderColor: "#6b7280",
            },
            ticks: {
              color: "#9ca3af",
              font: { size: 12 },
            },
          },
          y: {
            grid: {
              color: "#374151",
              borderColor: "#6b7280",
            },
            ticks: {
              color: "#9ca3af",
              font: { size: 12 },
              callback: function (value) {
                return type === "bar"
                  ? value.toLocaleString()
                  : "$" + value.toLocaleString();
              },
            },
          },
        },
      },
    };

    chartInstance.current = new window.Chart(ctx, config);

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, chartJsLoaded, title, type]);

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
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
