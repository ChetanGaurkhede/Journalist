import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  PackageOpen,
} from "lucide-react";
import React from "react";

function AccountSummary({
  balance = 0,
  dailyPnL = 0,
  weeklyPnL = 0,
  monthlyPnL = 0,
}) {
  const formatCurrency = (value) =>
    `$${Math.abs(value).toLocaleString(undefined, {
      minimumFractionDigits: 2,
    })}`;

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Account Balance */}
        <div className="bg-white p-6 rounded-2xl flex-1 shadow-lg border border-gray-200 flex flex-col justify-between gap-2">
          <div className="text-gray-500 text-sm mb-2 w-full flex justify-between items-center">
            <h4>Account Balance</h4>
            <PackageOpen size={18} />
          </div>
          <div className="flex items-center gap-3">
            <Wallet className="text-yellow-500" size={28} />
            <span className="text-3xl font-bold text-gray-900">
              {formatCurrency(balance)}
            </span>
          </div>
          <div className="mt-3 text-xs text-gray-400 ml-auto">
            Updated: {new Date().toLocaleDateString()}
          </div>
        </div>

        {/* P&L Summary */}
        <div className="bg-gray-100 p-4 rounded-2xl flex-[2] shadow-lg border border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Daily */}
            <div className="bg-white p-4 rounded-2xl shadow-sm">
              <div className="text-gray-500 text-sm mb-2">Daily P&L</div>
              <div className="text-2xl font-bold flex items-center justify-between text-gray-900">
                {formatCurrency(dailyPnL)}
                {dailyPnL >= 0 ? (
                  <TrendingUp className="text-green-500" />
                ) : (
                  <TrendingDown className="text-red-500" />
                )}
              </div>
            </div>

            {/* Weekly */}
            <div className="bg-white p-4 rounded-2xl shadow-sm">
              <div className="text-gray-500 text-sm mb-2">Weekly P&L</div>
              <div className="text-2xl font-bold flex items-center justify-between text-gray-900">
                {formatCurrency(weeklyPnL)}
                {weeklyPnL >= 0 ? (
                  <TrendingUp className="text-green-500" />
                ) : (
                  <TrendingDown className="text-red-500" />
                )}
              </div>
            </div>

            {/* Monthly */}
            <div className="bg-white p-4 rounded-2xl shadow-sm">
              <div className="text-gray-500 text-sm mb-2">Monthly P&L</div>
              <div className="text-2xl font-bold flex items-center justify-between text-gray-900">
                {formatCurrency(monthlyPnL)}
                {monthlyPnL >= 0 ? (
                  <TrendingUp className="text-green-500" />
                ) : (
                  <TrendingDown className="text-red-500" />
                )}
              </div>
            </div>
          </div>

          {/* Extra Info */}
          <div className="mt-5 flex justify-between items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar size={14} /> Market Data Delayed by 15 mins
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} /> Last Sync: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>
      <div>
        
      </div>
    </div>
  );
}

export default AccountSummary;
