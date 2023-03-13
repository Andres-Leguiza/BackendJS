import express from "express";
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import config from './config/config.js';
import cookie from "cookie-parser";
import session from "express-session";
import mongoStore from "connect-mongo";
import passport from 'passport';
import ViewsRouter from './routes/views.router.js';
import ProductsRouter from "./routes/products.router.js";
import CartsRouter from './routes/carts.router.js';
import UserRouter from "./routes/user.router.js";
import AuthRouter from "./routes/auth.router.js";
import GithubRouter from './routes/github.router.js';

const app = express();
app.listen(config.port, () => console.log(`Server up on port ${config.port}.`));

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
      mongoUrl: config.mongoURI,
      options: {
        userNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    secret: config.secret,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 300000 },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/products", ProductsRouter);
app.use("/api/carts", CartsRouter);
app.use("/api/users", UserRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/github", GithubRouter);
app.use("/views", ViewsRouter);