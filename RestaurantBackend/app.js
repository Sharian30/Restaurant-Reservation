import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import { dbConnection } from './database/dbConnection.js';
import { errorMiddleware } from './error/error.js';
import reservationRouter from './routes/reservation.js';
import authRouter from "./routes/authRoutes.js";

dotenv.config({ path: './.env' });
const app = express();

// CORS configuration should come first
app.use(cors({
  origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Important for sessions to work cross-origin
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Session middleware
app.use(session({
  name: 'sessionId', // Custom cookie name
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Auto-adjust based on environment
    httpOnly: true,
    sameSite: 'lax', // Helps with CSRF protection
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/reservation', reservationRouter);
app.use("/api/v1/auth", authRouter);

// Database connection
dbConnection();

// Error middleware (should be last)
app.use(errorMiddleware);

export default app;