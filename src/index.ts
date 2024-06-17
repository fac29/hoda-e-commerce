import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import productRouter from './routes/productRouter';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.use('/products', productRouter);