import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import config from './config/config.js';
import passport from 'passport';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import { SwaggerTheme } from 'swagger-themes';
import ViewsRouter from './routes/views.router.js';
import ProductsRouter from './routes/products.router.js';
import CartsRouter from './routes/carts.router.js';
import PaymentsRouter from './routes/payments.router.js';
import UsersRouter from './routes/users.router.js';
import AuthRouter from './routes/auth.router.js';
import SessionRouter from './routes/sessions.route.js';
import GithubRouter from './routes/github.router.js';
import MocksRouter from './routes/mocks.router.js';
import LoggerTestRouter from './routes/loggerTest.router.js';
import errorHandler from './middlewares/errorHandler.middleware.js';

const app = express();
app.listen(config.port, () => console.log(`Server up on port ${config.port}.`));

const darkStyle = new SwaggerTheme('v3').getBuffer('dark');
const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: "eCommerce Coderhouse",
            description: "Documentation for eCommerce APIs",
            version: "1.0.0"
        },
        servers: [
            { url: "http://localhost:3000" }
        ]
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
};

const specs = swaggerJSDoc(swaggerOptions);
app.use('/dark/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs, { customCss: darkStyle }));
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine','handlebars');
app.use(express.static(__dirname+'/public'));
app.use(express.static(__dirname+'/img'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.on("error", (error) => console.log(error));
app.use(passport.initialize());

app.use("/api/products", ProductsRouter);
app.use("/api/carts", CartsRouter);
app.use("/api/payments", PaymentsRouter);
app.use("/api/users", UsersRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/sessions", SessionRouter);
app.use("/api/github", GithubRouter);
app.use("/api/mocks", MocksRouter);
app.use("/api/test", LoggerTestRouter);
app.use("/views", ViewsRouter);
app.use(errorHandler);