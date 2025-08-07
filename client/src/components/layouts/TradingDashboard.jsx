import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import MetricCard from "../MetricCard";
import AccountSummary from "../AccountSummary";
import CandlestickChart from "../CandlestickChart";
import TradingTable from "../TradingTable";

const TradingDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartJsLoaded, setChartJsLoaded] = useState(false);

  // Load Chart.js dynamically
  useEffect(() => {
    if (window.Chart) {
      setChartJsLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js";
    script.onload = () => {
      setChartJsLoaded(true);
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(import.meta.env.VITE_API_URL);
        setAnalytics(res.data.data);
      } catch (err) {
        setError(`Failed to fetch trading data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  useEffect(() => {
    if (analytics) {
      console.log("Updated analytics:", analytics);
    }
  }, [analytics]);

  const TradingChart = ({ data, title, type = "line" }) => {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mb-4"></div>
          <p className="text-gray-400">Loading trading data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-2xl mb-4">⚠️ Error</div>
          <p className="text-gray-400">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-yellow-400 text-2xl mb-4">⚠️ No Data</div>
          <p className="text-gray-400">No trading data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="max-w-7xl mx-auto p-2 lg:p-4">
        {/* Account Summary */}
        <AccountSummary
          balance={analytics?.accountBalance}
          dailyPnL={analytics?.dailyPnL}
          weeklyPnL={analytics?.weeklyPnL}
        />

        {/* Key Performance Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <MetricCard
            title="Win Rate"
            value={`${analytics?.winRate || 0}%`}
            isPositive={(analytics?.winRate || 0) >= 50}
            icon="🎯"
          />
          <MetricCard
            title="Profit Factor"
            value={(analytics?.profitFactor || 0).toFixed(2)}
            isPositive={(analytics?.profitFactor || 0) > 1}
            icon="📊"
          />
          <MetricCard
            title="Sharpe Ratio"
            value={(analytics?.sharpeRatio || 0).toFixed(2)}
            subtitle="Risk-adjusted returns"
            isPositive={(analytics?.sharpeRatio || 0) > 1}
            icon="⚡"
          />
          <MetricCard
            title="Max Drawdown"
            value={`${analytics?.maxDrawdown || 0}%`}
            isPositive={false}
            icon="📉"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Left Side: Metrics (2 columns stacked vertically) */}
          <div className="lg:col-span-2 space-y-4 mb-4 lg:mb-0 lg:w-1/2 grid grid-rows-2">
            <div className="grid grid-cols-3 gap-4">
              <MetricCard
                title="Total Trades"
                value={(analytics?.totalTrades || 0).toLocaleString()}
                isNeutral={true}
                icon="🔄"
              />
              <MetricCard
                title="Winning Trades"
                value={(analytics?.winningTrades || 0).toLocaleString()}
                isPositive={true}
                icon="✅"
              />
              <MetricCard
                title="Losing Trades"
                value={(analytics?.losingTrades || 0).toLocaleString()}
                isPositive={false}
                icon="❌"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <MetricCard
                title="Win Streak"
                value={(analytics?.longestWinStreak || 0).toString()}
                subtitle="Longest"
                isPositive={true}
                icon="🔥"
              />
              <MetricCard
                title="Loss Streak"
                value={(analytics?.longestLossStreak || 0).toString()}
                subtitle="Longest"
                isPositive={false}
                icon="🧊"
              />
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 w-full lg:w-1/2">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <span className="text-orange-500 mr-2">🥧</span>
              Win/Loss Distribution
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Winning Trades</span>
                <span className="text-green-400 font-bold">
                  {analytics?.winningTrades || 0}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-4">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-400 h-4 rounded-full transition-all duration-1000"
                  style={{ width: `${analytics?.winRate || 0}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Losing Trades</span>
                <span className="text-red-400 font-bold">
                  {analytics?.losingTrades || 0}
                </span>
              </div>
              <div className="text-center mt-6">
                <div className="text-3xl font-bold text-orange-500">
                  {analytics?.winRate || 0}%
                </div>
                <div className="text-sm text-gray-400">
                  Overall Success Rate
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          {analytics?.plCurveData && (
            <TradingChart
              data={analytics.plCurveData}
              title="Portfolio Equity Curve"
              type="line"
            />
          )}
          {analytics?.volumeData && (
            <TradingChart
              data={analytics.volumeData}
              title="Trading Volume"
              type="bar"
            />
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          {analytics?.priceData && (
            <CandlestickChart
              data={analytics.priceData}
              title="BTCUSDT Price Action"
            />
          )}
        </div>

        {/* Trading Table */}
        {analytics?.recentTrades && (
          <TradingTable trades={analytics.recentTrades} />
        )}
      </div>
    </div>
  );
};

export default TradingDashboard;
