function TradingTable({ trades }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-md ">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <span className="text-orange-500 mr-2">⚡</span>
          Recent Trades
        </h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              {[
                "Symbol",
                "Side",
                "Entry",
                "Exit",
                "P&L",
                "Return",
                "Time",
              ].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {trades.map((trade) => (
              <tr
                key={trade.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800">
                  {trade.symbol}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${
                      trade.type === "Long"
                        ? "bg-green-100 text-green-700 border border-green-400"
                        : "bg-red-100 text-red-700 border border-red-400"
                    }`}
                  >
                    {trade.type.toUpperCase()}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                  ${trade.entry.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono">
                  ${trade.exit.toLocaleString()}
                </td>

                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${
                    trade.pnl >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {trade.pnl >= 0 ? "+" : ""}${trade.pnl.toFixed(2)}
                </td>

                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${
                    trade.pnlPercent >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {trade.pnlPercent >= 0 ? "+" : ""}
                  {trade.pnlPercent.toFixed(2)}%
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {trade.date} {trade.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TradingTable;
