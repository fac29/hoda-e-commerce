const cookieParser = require('cookie-parser');
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import productRouter from './routes/productRouter';
import signUpRouter from './routes/signupRouter';

const CORS = require('cors');

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const cookies = cookieParser(process.env.COOKIE_SECRET);

var corsOptions = {
    origin: ['http://localhost:5173', /^localhost:'/],
    optionsSuccessStatus: 200,
    // origin:true -> if you want to allow requests from all origins
};

app.use(cookies);
app.use(CORS(corsOptions));
app.use(express.json());

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.use('/products', productRouter);
app.use(signUpRouter);
