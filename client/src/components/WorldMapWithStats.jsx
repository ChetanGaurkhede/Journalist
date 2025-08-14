import React from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const markers = [
  { name: "United States", coordinates: [-97, 38], percentage: 90, flag: "🇺🇸" },
  { name: "Brazil", coordinates: [-51, -10], percentage: 75, flag: "🇧🇷" },
  { name: "Japan", coordinates: [138, 36], percentage: 40, flag: "🇯🇵" },
  { name: "Canada", coordinates: [-106, 56], percentage: 30, flag: "🇨🇦" },
  { name: "France", coordinates: [2, 46], percentage: 15, flag: "🇫🇷" },
];

function WorldMapWithStats() {
  return (
    <div className="flex border-gray-200 border rounded-2xl overflow-hidden bg-gray-50 h-[400px]">
      {/* Map Section */}
      <div className="w-2/3 p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Target Demographics{" "}
          <span className="text-xs bg-purple-100 text-purple-600 px-2 py-0.5 rounded">
            Beta
          </span>
        </h2>

        <ComposableMap
          projectionConfig={{ scale: 140 }}
          style={{ backgroundColor: "transparent" }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="transparent"
                  stroke="#d1d5db" // light gray
                  strokeWidth={0.5}
                />
              ))
            }
          </Geographies>

          {markers.map(({ name, coordinates }) => (
            <Marker key={name} coordinates={coordinates}>
              <circle r={8} fill="rgba(59,130,246,0.4)" /> {/* glow */}
              <circle r={4} fill="#3B82F6" />              {/* solid blue */}
            </Marker>
          ))}
        </ComposableMap>
      </div>

      {/* Stats Section */}
      <div className="w-1/3 bg-white p-6">
        <div className="text-3xl font-bold text-gray-900 mb-2">98,2K</div>
        <div className="text-sm text-gray-500 mb-6">
          Global customers worldwide
        </div>

        {markers.map((country) => (
          <div key={country.name} className="mb-4">
            <div className="flex justify-between text-sm text-gray-700 mb-1">
              <span>
                {country.flag} {country.name}
              </span>
              <span>{country.percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${country.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}

        <button className="mt-4 text-sm text-blue-600 hover:underline">
          See All Demographics →
        </button>
      </div>
    </div>
  );
}

export default WorldMapWithStats;
