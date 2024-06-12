import express, { Express } from 'express';
import dotenv from 'dotenv';
import { setupRoutes } from './routes/router';
import { getProducts } from './controller/controller';
import { getID, getName } from './controller/controller';
import { getProductByName } from '../model/product';
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

//setupRoutes();
app.get('/get-products', getProducts);
app.get('/get-products/:id', getID);
// app.get('/get-products/:name', getName);
console.log(getProductByName);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
