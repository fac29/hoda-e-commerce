"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const productRouter_1 = __importDefault(require("./routes/productRouter"));
const CORS = require('cors');
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
var corsOptions = {
    origin: ['http://localhost:5173', /^localhost:'/],
    optionsSuccessStatus: 200,
    // origin:true -> if you want to allow requests from all origins
};
app.use(CORS(corsOptions));
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
app.use('/products', productRouter_1.default);
