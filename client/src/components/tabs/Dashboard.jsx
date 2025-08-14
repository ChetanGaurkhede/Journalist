import React from 'react';
import MetricCard from '../MetricCard';
import WorldMapWithStats from '../WorldMapWithStats';

function Dashboard({ metricData }) {
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metricData.map((card, index) => (
          <MetricCard key={index} {...card} />
        ))}
      </div>
      <WorldMapWithStats />
    </div>
  );
}

export default Dashboard;
