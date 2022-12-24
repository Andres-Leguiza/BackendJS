import express from "express";
import __dirname from './utils.js';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import productsRouter from "./routes/products.router.js";
import cartsRouter from './routes/carts.router.js';

const app = express();
const httpServer = app.listen(8080, () => console.log("Server up on port 8080."));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine','handlebars');
app.use(express.static(__dirname+'/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    req.io = socketServer;
    next();
});
app.on("error", (error) => console.log(error));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/views", viewsRouter);

const socketServer = new Server(httpServer);

socketServer.on("connection", socket => {
    console.log("Server Connected.");

    socket.on("disconnect", socket => {
        console.log("Server Disconnected.");
    });
});