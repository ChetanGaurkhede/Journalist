import { EllipsisVertical, TrendingDown, TrendingUp } from "lucide-react";
import React from "react";

function MetricCard({ title, value, subtitle, isPositive, isNeutral, icon }) {
  return (
    <div className="border-gray-100 border-[1px] rounded-2xl p-3 lg:p-5 shadow-sm transition-all duration-300">
      <div className="flex items-center justify-between mb-1 lg:mb-2">
        <h3 className="text-sm lg:text-md font-semibold text-gray-700 ">
          {title}
        </h3>
        <EllipsisVertical className="h-4 text-gray-600" />
      </div>
      <div className={`text-2xl lg:text-3xl font-bold mb-1 text-gray-700`}>
        {value}
      </div>
      <div className="w-full flex mt-4 justify-between items-center">
        <div className="flex items-center gap-3">
          {isNeutral ? (
            "text-white"
          ) : isPositive ? (
            <TrendingUp className="h-6 w-6 text-green-400" />
          ) : (
            <TrendingDown className="h-6 w-6 text-red-400" />
          )}
          <div className="text-[10px] font-semibold text-gray-600">
            Vs last month
          </div>
        </div>
        <div className="text-xl">{icon}</div>
      </div>
    </div>
  );
}

export default MetricCard;
