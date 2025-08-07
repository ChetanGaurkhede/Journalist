function TradingTable({ trades }) {
  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="p-6 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <span className="text-orange-500 mr-2">⚡</span>
          Recent Trades
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">
                Symbol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">
                Side
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">
                Entry
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">
                Exit
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">
                P&L
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">
                Return
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-orange-500 uppercase tracking-wider">
                Time
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {trades.map((trade) => (
              <tr
                key={trade.id}
                className="hover:bg-gray-700 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-white">
                  {trade.symbol}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${
                      trade.type === "Long"
                        ? "bg-green-900 text-green-400 border border-green-400"
                        : "bg-red-900 text-red-400 border border-red-400"
                    }`}
                  >
                    {trade.type.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-mono">
                  ${trade.entry.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-mono">
                  ${trade.exit.toLocaleString()}
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${
                    trade.pnl >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {trade.pnl >= 0 ? "+" : ""}${trade.pnl.toFixed(2)}
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${
                    trade.pnlPercent >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {trade.pnlPercent >= 0 ? "+" : ""}
                  {trade.pnlPercent.toFixed(2)}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
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
