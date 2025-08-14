import React from "react";
import { useAnalytics } from "../../context/AnalyticsContext";
import CandlestickChart from "../CandlestickChart";
import TradingTable from "../TradingTable";
import MetricCard from "../MetricCard";

function Profile() {
  const { analytics } = useAnalytics();
  console.log("analytics", analytics);
  console.log(analytics?.priceData);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
        <div className="bg-white rounded-lg border border-gray-200 p-6 w-full shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="text-orange-500 mr-2">🥧</span>
            Win/Loss Distribution
          </h3>

          <div className="space-y-4">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-green-500 to-green-400 h-4 rounded-full transition-all duration-1000"
                style={{ width: `${analytics?.winRate || 0}%` }}
              ></div>
            </div>
            <div className=" flex w-full justify-between items-center">
              {/* Winning Trades */}
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Winning Trades</span>
                <span className="text-green-600 font-bold">
                  {analytics?.winningTrades || 0}
                </span>
              </div>

              {/* Losing Trades */}
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Losing Trades</span>
                <span className="text-red-500 font-bold">
                  {analytics?.losingTrades || 0}
                </span>
              </div>
            </div>

            {/* Overall Success Rate */}
            {/* <div className="text-center mt-6">
              <div className="text-3xl font-bold text-orange-500">
                {analytics?.winRate || 0}%
              </div>
              <div className="text-sm text-gray-600">Overall Success Rate</div>
            </div> */}
          </div>
        </div>
      </div>
      {analytics?.recentTrades && (
        <TradingTable trades={analytics.recentTrades} />
      )}
    </div>
  );
}

export default Profile;
