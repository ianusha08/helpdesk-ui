require('dotenv').config();
const express = require('express');
const cors = require('cors');
const ticketRoutes = require('./routes/tickets');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.FRONTEND_URL || '*', // Allow frontend domain or all for simplicity
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/tickets', ticketRoutes);

app.get('/', (req, res) => {
  res.send('Helpdesk API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
