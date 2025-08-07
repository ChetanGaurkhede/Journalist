function CandlestickChart({ data, title }) {
  return(
 <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <span className="text-orange-500 mr-2">📊</span>
        {title}
      </h3>
      <div className="relative h-64 bg-gray-900 rounded p-4">
        <div className="grid grid-cols-8 h-full gap-1">
          {data.map((point, i) => {
            const isGreen = i === 0 || point.price >= data[i - 1]?.price;
            return (
              <div key={i} className="flex flex-col justify-end items-center">
                <div
                  className={`w-2 rounded-sm ${
                    isGreen ? "bg-green-400" : "bg-red-400"
                  }`}
                  style={{
                    height: `${(point.price - 43000) / 10}%`,
                    minHeight: "4px",
                  }}
                  title={`${point.time}: $${point.price.toLocaleString()}`}
                ></div>
                <span className="text-xs text-gray-400 mt-1">
                  {point.time.slice(-2)}
                </span>
              </div>
            );
          })}
        </div>
        <div className="absolute bottom-2 left-4 text-xs text-gray-400">
          Price Range: $43,000 - $44,000
        </div>
      </div>
    </div>)
}

export default CandlestickChart