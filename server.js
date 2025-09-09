import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Basic CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

app.use(express.json());

// Basic health check
app.get('/api/health', (req, res) => {
  console.log('Health check received');
  res.json({ status: 'Server is running!' });
});

// Simple test endpoint
app.post('/api/test', (req, res) => {
  console.log('Test endpoint called:', req.body);
  res.json({ message: 'Test successful!', data: req.body });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;