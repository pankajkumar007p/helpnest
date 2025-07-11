const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Initialize Express App
const app = express();

// Middlewares
app.use(cors()); // Allows requests from your React frontend
app.use(express.json()); // Parses incoming JSON requests

// --- Database Connection ---
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- API Routes ---
app.get('/', (req, res) => {
  res.send('HelpNest API is running...');
});

// Use the ticket and auth routes
app.use('/api/tickets', require('./routes/tickets'));
app.use('/api/auth', require('./routes/auth'));

// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));