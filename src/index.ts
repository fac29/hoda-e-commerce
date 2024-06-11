import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { listProductsAll } from '../model/product';
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('E-Commerce App: Express + TypeScript Server');
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

console.log(`LOOK HEREE: ${listProductsAll}`);
