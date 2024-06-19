const cookieParser = require('cookie-parser');
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import productRouter from './routes/productRouter';
import signUpRouter from './routes/signupRouter';

const CORS = require('cors');

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const cookies = cookieParser('secret');

var corsOptions = {
    origin: ['http://localhost:5173', /^localhost:'/],
    optionsSuccessStatus: 200,
    // origin:true -> if you want to allow requests from all origins
};
app.use(express.json());
app.use(cookies);
app.use(CORS(corsOptions));

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.use('/products', productRouter);
app.use(signUpRouter);
