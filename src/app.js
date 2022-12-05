
import ProductManager from "./ProductManager.js";
import express from "express";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.listen(8080, () => console.log("Server up on port 8080."));
app.on("error", (error) => console.log(error));

let productManager = new ProductManager();
const PRODUCT_NOT_EXIST = "This product does not exist.";

app.get("/products", (req, res) => {
    const { limit } = req.query;
    let products = productManager.getProducts();
    if(limit && limit > 0 && limit < products.length){
        products = products.splice(0, limit);
    }
    res.status(200).json(products);
});

app.get("/products/:pid", (req, res) => {
    const { pid } = req.params;
    let products = productManager.getProductById(Number(pid));
    products == PRODUCT_NOT_EXIST ? 
    res.status(404).json({error: products}) :
    res.status(200).json(products);
});