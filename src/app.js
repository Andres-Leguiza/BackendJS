import express from "express";
import productsRouter from "./routers/products.router.js";
import cartsRouter from './routers/carts.router.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(8080, () => console.log("Server up on port 8080."));
app.on("error", (error) => console.log(error));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);