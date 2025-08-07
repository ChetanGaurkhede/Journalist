import React from "react";

function AccountSummary({ balance, dailyPnL, weeklyPnL }) {
  // Add default values and null checks
  const safeBalance = balance || 0;
  const safeDailyPnL = dailyPnL || 0;
  const safeWeeklyPnL = weeklyPnL || 0;

  return (
    <div className="bg-gradient-to-t from-gray-800 to-gray-900 rounded-lg border-0 mb-8 overflow-hidden">
      <h2 className="lg:text-xl font-semibold p-3 text-white flex items-center bg-gradient-to-t from-gray-900 to-gray-950">
        Account Overview
      </h2>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Account Balance */}
        <div className="bg-gray-600 p-4 rounded-md flex-1 text-center">
          <div className="text-sm text-gray-300 mb-1">Account Balance</div>
          <div className="text-2xl lg:text-3xl font-bold text-white">
            ${safeBalance.toLocaleString()}
          </div>
        </div>

        {/* Daily and Weekly P&L */}
        <div className="bg-gray-600 p-4 rounded-md flex-1 flex  justify-between items-center gap-4">
          {/* Daily P&L */}
          <div className="text-center w-full sm:w-1/2">
            <div className="text-sm text-gray-300 mb-1">Daily P&L</div>
            <div
              className={`text-xl lg:text-3xl font-bold ${
                safeDailyPnL >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {safeDailyPnL >= 0 ? "+" : "-"}$
              {Math.abs(safeDailyPnL).toLocaleString()}
            </div>
          </div>

          {/* Weekly P&L */}
          <div className="text-center w-full sm:w-1/2">
            <div className="text-sm text-gray-300 mb-1">Weekly P&L</div>
            <div
              className={`text-xl lg:text-3xl font-bold ${
                safeWeeklyPnL >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {safeWeeklyPnL >= 0 ? "+" : "-"}$
              {Math.abs(safeWeeklyPnL).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountSummary;
