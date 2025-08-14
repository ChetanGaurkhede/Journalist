import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import AccountSummary from "../AccountSummary";
import TradingChart from "../TradingChart";

import {
  Bell,
  Calendar,
  Home,
  LayoutDashboard,
  Search,
  Settings2,
  ToolCase,
  Upload,
  User,
} from "lucide-react";
import Dashboard from "../tabs/Dashboard";
import { useAnalytics } from "../../context/AnalyticsContext";
import AccountOverview from "../tabs/AccountOverview";
import Profile from "../tabs/Profile";

const TradingDashboard = () => {
  const { analytics, loading, error, refetch } = useAnalytics();
  const [currentTab, setCurrentTab] = useState(() => {
    return localStorage.getItem("currentTab") || "home";
  });

  useEffect(() => {
    console.log(analytics);
  }, [analytics]);

  // if (loading) {
  //   return (
  //     <div className="min-h-screen  flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mb-4"></div>
  //       </div>
  //     </div>
  //   );
  // }

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

  // if (!analytics) {
  //   return (
  //     <div className="min-h-screen bg-gray-900 flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="text-yellow-400 text-2xl mb-4">⚠️ No Data</div>
  //         <p className="text-gray-400">No trading data available</p>
  //       </div>
  //     </div>
  //   );
  // }
  const navItems = [
    { name: "Account Overview", icon: <Home size={20} /> },
    { name: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Profile", icon: <User size={20} /> },
    { name: "Calender", icon: <Calendar size={20} /> },
    { name: "Notification", icon: <Bell size={20} /> },
  ];

  const metricCards = [
    {
      title: "Win Rate",
      value: `${analytics?.winRate || 0}%`,
      isPositive: (analytics?.winRate || 0) >= 50,
      icon: "🎯",
    },
    {
      title: "Profit Factor",
      value: (analytics?.profitFactor || 0).toFixed(2),
      isPositive: (analytics?.profitFactor || 0) > 1,
      icon: "📊",
    },
    {
      title: "Sharpe Ratio",
      value: (analytics?.sharpeRatio || 0).toFixed(2),
      subtitle: "Risk-adjusted returns",
      isPositive: (analytics?.sharpeRatio || 0) > 1,
      icon: "⚡",
    },
    {
      title: "Max Drawdown",
      value: `${analytics?.maxDrawdown || 0}%`,
      isPositive: false,
      icon: "📉",
    },
  ];

  function renderTab(tab) {
    switch (tab) {
      case "Account Overview":
        return <AccountOverview />;
      case "Dashboard":
        return <Dashboard metricData={metricCards} />;
      case "Profile":
        return <Profile />;
      case "Calender":
        return <div>Callendar</div>;
      case "Notification":
        return <div>👤 Notification</div>;
      default:
        return <div>❓ Not Found</div>;
    }
  }

  return (
    <div className="w-full h-screen flex">
      {/* Sidebar */}
      <div className="h-full bg-gray-10 text-gray-700 p-4 space-y-3 shadow border-r border-gray-200">
        <div class="h-11 w-11 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-pink-500 mb-5">
          <span class="text-white text-3xl font-bold">C</span>
        </div>

        {navItems.map((item) => (
          <div
            key={item.name}
            onClick={() => setCurrentTab(item.name)}
            className={`flex items-center gap-2 p-3 rounded-full cursor-pointer hover:bg-gray-300 ${
              currentTab === item.name ? "bg-gray-200" : ""
            }`}
          >
            {item.icon}
          </div>
        ))}
      </div>

      <div className="flex-1 bg-white text-gray-800 h-screen flex flex-col">
        {/* Sticky navbar */}
        <div className="w-full sticky top-0 bg-gray-100 p-4 text-lg font-bold text-gray-800 shadow border-b border-gray-200 flex justify-between items-center z-10">
          <div className="text-2xl font-semibold">{currentTab}</div>
          <div className="flex gap-2 items-center justify-center">
            <Search className="text-gray-600 mr-3" />
            <div className="flex items-center justify-center gap-2 bg-white p-2 px-4 text-sm font-semibold rounded-4xl border border-gray-300 shadow-2xl">
              <Settings2 size={16} className="text-gray-500" />
              <p className="text-gray-500">Customize</p>
            </div>
            <div className="flex items-center justify-center gap-2 bg-white p-2 px-4 text-sm font-semibold rounded-4xl border border-gray-300 shadow-2xl">
              <Upload size={16} className="text-gray-500" />
              <p className="text-gray-500">Add New</p>
            </div>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="min-h-full  flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mb-4"></div>
              </div>
            </div>
          ) : (
            renderTab(currentTab)
          )}
        </div>
      </div>
    </div>
  );
};

//https://dribbble.com/shots/24320666-slothUI-World-s-Laziest-Design-System-Demographics-Dashboard

export default TradingDashboard;
