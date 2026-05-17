import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import product from './routes/productRoutes.js';
import user from './routes/userRoutes.js';
import order from './routes/orderRoutes.js';
import payment from './routes/paymentRoutes.js';
import errorHandleMiddleware from './middleware/error.js';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import helmet from 'helmet'



const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
}));

app.use(helmet());



// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);


// Error middleware
app.use(errorHandleMiddleware);

export default app;
