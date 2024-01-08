import dotenv from 'dotenv';
import express from 'express';
import connectDB from './DB/connection.js';
import userRoutes from './Routes/userRoutes.js';


const app = express();

dotenv.config();

app.use(express.urlencoded({ extended: true })); // Middleware for parsing form data
app.use(express.json());



connectDB();

app.use('/', userRoutes);

app.listen(process.env.DB_PORT, () => {
  console.log(`Example app listening on port ${process.env.DB_PORT}`);
});
