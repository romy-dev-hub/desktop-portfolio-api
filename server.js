import express from 'express';

const app = express();
const PORT = process.env.PORT || 5000;

// Better error handling for JSON parsing
app.use(express.json({ limit: '10mb' }));

// Add request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Basic health check
app.get('/api/health', (req, res) => {
  console.log('Health check received');
  res.json({ 
    status: 'Server is running!',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Start server with better error handling
try {
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server successfully started on port ${PORT}`);
    console.log(`✅ Health check available at: http://0.0.0.0:${PORT}/api/health`);
  });

  // Handle server errors
  server.on('error', (error) => {
    console.error('❌ Server error:', error);
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use`);
    }
  });

} catch (error) {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
}