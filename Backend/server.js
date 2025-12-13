import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import authRouter from './routes/authRoute.js';
import productRouter from './routes/authProduct.js';


const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.use('/api/auth' , authRouter)
app.use('/api/product' , productRouter )

connectDb();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});