import generateRealisticTradingData from "../data/generateRealisticTradingData.js";

const getAnalytics = async (req, res) => {
  try {
    const analyticsData = generateRealisticTradingData();

    setTimeout(() => {
      res.json({
        success: true,
        data: analyticsData,
        timestamp: new Date().toISOString()
      });
    }, Math.random() * 1000 + 500); // 500-1500ms delay
  } catch (error) {
    console.error('Error generating analytics data:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to generate analytics data'
    });
  }
}

export default getAnalytics