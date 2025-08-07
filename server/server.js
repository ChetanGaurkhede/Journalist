
import express from 'express'
import cors from 'cors'
import getAnalytics from './controllers/alalyticsController.js';
import analyticsRoutes from './routes/analyticsRoute.js'
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/analytics', analyticsRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    message: `Cannot ${req.method} ${req.path}`
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Journalyst Analytics Server running on http://localhost:${PORT}`);
  console.log(`📊 Analytics endpoint: http://localhost:${PORT}/api/analytics`);
  console.log(`🔍 Health check: http://localhost:${PORT}/api/health`);
});
