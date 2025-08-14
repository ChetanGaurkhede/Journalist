import React from "react";
import { useAnalytics } from "../../context/AnalyticsContext";
import TradingChart from "../TradingChart";
import AccountSummary from "../AccountSummary";

function AccountOverview() {
  const { analytics } = useAnalytics();

  return (
    <div className="w-full h-full">
      <AccountSummary
        balance={analytics?.accountBalance}
        dailyPnL={analytics?.dailyPnL}
        weeklyPnL={analytics?.weeklyPnL}
      />

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
    </div>
  );
}

export default AccountOverview;
