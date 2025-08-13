const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 4002;

// Middleware - replace bodyParser with built-in express.json()
app.use(express.json()); // This is crucial for POST requests
app.use(express.urlencoded({ extended: true })); // For form data
app.use(cors({
  origin: 'https://login-auth-orpin.vercel.app',
  credentials: true
}));

// Routes
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');

app.get("/favicon.ico", (req, res) => res.status(204));
app.get('/ping', (req, res) => {
    res.json({ message: 'PONG_Hello World' }); // Always return JSON
});

app.get("/", (req, res) => {
    res.json({ message: "Backend Running & MongoDB Connected 🚀" });
});

app.use('/auth', AuthRouter);
app.use('/product', ProductRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});