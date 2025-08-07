import React from "react";

function MetricCard({ title, value, subtitle, isPositive, isNeutral, icon }) {
  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-3 lg:p-6 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center justify-between mb-1 lg:mb-2">
        <h3 className="text-xs lg:text-sm font-medium text-gray-400 uppercase tracking-wide">
          {title}
        </h3>
      </div>
      <div
        className={`text-lg lg:text-xl font-bold mb-1 ${
          isNeutral
            ? "text-white"
            : isPositive
            ? "text-green-400"
            : "text-red-400"
        }`}
      >
        {value}
      </div>
      {/* {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>} */}
    </div>
  );
}

export default MetricCard;
