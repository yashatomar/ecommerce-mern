import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import seedAdmin from './config/seedAdmin.js'; // <-- ADDED
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

dotenv.config();

// Connect to DB, then seed admin
connectDB().then(() => {
  seedAdmin(); // <-- ADDED: Runs admin seeding after DB connects
});

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: true, // Dynamically allows whatever origin is requesting 
  credentials: true, // Allow cookies (JWT) to be sent
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);

app.get('/', (req, res) => {
  res.send('API is running....');
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

app.listen(port, () => console.log(`🚀 Server running on port ${port}`));