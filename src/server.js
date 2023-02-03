import express from "express";
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import dotenv from 'dotenv';
dotenv.config();
if(process.env.MONGO_URI) import ("./config/db.js");
import cookie from "cookie-parser";
import session from "express-session";
import mongoStore from "connect-mongo";
import ViewsRouter from './routes/views.router.js';
import ProductsRouter from "./routes/products.router.js";
import CartsRouter from './routes/carts.router.js';
import UserRouter from "./routes/user.router.js";
import AuthRouter from "./routes/auth.router.js";

const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server up on port ${PORT}.`));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine','handlebars');
app.use(express.static(__dirname+'/public'));
app.use(express.static(__dirname+'/img'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.on("error", (error) => console.log(error));
app.use(cookie());
app.use(
  session({
    store: new mongoStore({
      mongoUrl: process.env.MONGO_URI,
      options: {
        userNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 300000 },
  }),
);

app.use("/api/products", ProductsRouter);
app.use("/api/carts", CartsRouter);
app.use("/api/users", UserRouter);
app.use("/api/auth", AuthRouter);
app.use("/views", ViewsRouter);