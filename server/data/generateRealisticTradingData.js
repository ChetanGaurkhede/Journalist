const generateRealisticTradingData = () => {
  // Generate random but realistic values
  const accountBalance = Math.floor(Math.random() * 100) + 1000; 
  const dailyPnL = Math.floor(Math.random() * 100) + 150; 
  const weeklyPnL = Math.floor(Math.random() * 300) + 150; 
  const totalTrades = Math.floor(Math.random() * 300) + 150;
  const winRate = Math.random() * 30 + 55; 
  const winningTrades = Math.floor((winRate / 100) * totalTrades);
  const losingTrades = totalTrades - winningTrades;

  // Generate recent trades
  const symbols = ['AAPL', 'TSLA', 'MSFT', 'GOOGL', 'NVDA', 'SPY', 'QQQ', 'AMZN', 'META', 'NFLX'];
  const recentTrades = [];

  for (let i = 0; i < 10; i++) {
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    const type = Math.random() > 0.5 ? 'Long' : 'Short';
    const entry = Math.random() * 400 + 100;
    const returnPercent = (Math.random() - 0.3) * 5; 
    const exit = entry * (1 + returnPercent / 100);
    const pnl = (exit - entry) * 100; 

    const date = new Date();
    date.setDate(date.getDate() - i);

    recentTrades.push({
      id: i + 1,
      symbol,
      type,
      entry: parseFloat(entry.toFixed(2)),
      exit: parseFloat(exit.toFixed(2)),
      pnl: parseFloat(pnl.toFixed(2)),
      pnlPercent: parseFloat(returnPercent.toFixed(2)),
      date: date.toISOString().split('T')[0]
    });
  }

  // Generate P&L curve data
  const plCurveData = [];
  const volumeData = [];
  let cumulative = 0;
  const dates = ['Jul 1', 'Jul 8', 'Jul 15', 'Jul 22', 'Jul 29', 'Aug 1'];

  dates.forEach(date => {
    cumulative += (Math.random() - 0.3) * 5000; // Random walk with positive bias
    plCurveData.push({
      date,
      cumulative: Math.round(cumulative)
    });
  });
  dates.forEach(date => {
    cumulative += (Math.random() - 0.3) * 5000; // Random walk with positive bias
    volumeData.push({
      date,
      cumulative: Math.round(cumulative)
    });
  });

  const totalPL = cumulative;
  const totalPLPercent = (totalPL / 50000) * 100; // Assuming $50k starting capital

  return {
    accountBalance: parseFloat(accountBalance.toFixed(1)),
    dailyPnL: parseFloat(dailyPnL.toFixed(1)),
    weeklyPnL: parseFloat(weeklyPnL.toFixed(1)),
    winRate: parseFloat(winRate.toFixed(1)),
    profitFactor: parseFloat((1 + Math.random() * 1.5).toFixed(2)), // 1.0-2.5
    averageReturn: parseFloat(((Math.random() - 0.2) * 4).toFixed(1)), // -0.8% to +3.2%
    maxDrawdown: parseFloat((Math.random() * -20).toFixed(1)), // 0% to -20%
    totalTrades,
    winningTrades,
    losingTrades,
    longestWinStreak: Math.floor(Math.random() * 15) + 3, // 3-18
    longestLossStreak: Math.floor(Math.random() * 8) + 2, // 2-10
    sharpeRatio: parseFloat((Math.random() * 2 + 0.5).toFixed(2)), // 0.5-2.5
    totalPL: parseFloat(totalPL.toFixed(2)),
    totalPLPercent: parseFloat(totalPLPercent.toFixed(1)),
    recentTrades,
    plCurveData,
    volumeData
  };
};

export default generateRealisticTradingData;