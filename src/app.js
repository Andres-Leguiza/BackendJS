import express from "express";
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import ViewsRouter from './routes/views.router.js';
import ProductsRouter from "./routes/products.router.js";
import CartsRouter from './routes/carts.router.js';
import "./config/db.js";
import dotenv from 'dotenv'

dotenv.config();
const app = express();
app.listen(process.env.PORT, () => console.log(`Server up on port ${process.env.PORT}.`));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine','handlebars');
app.use(express.static(__dirname+'/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.on("error", (error) => console.log(error));

app.use("/api/products", ProductsRouter);
app.use("/api/carts", CartsRouter);
app.use("/views", ViewsRouter);