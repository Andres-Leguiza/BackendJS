import fs from "fs";

const PRODUCT_NOT_EXIST = "This product does not exist.";

class ProductManager {
    constructor() {
       this.products = [];
       this.path = "./src/products/Products.json";
    }

    addProduct(productToAdd){

        const {title, description, price, thumbnails, code, stock} = productToAdd;
        
        if(!title || !description || (price !== 0 && !price) || !code || (stock !== 0 && !stock)){
            console.log("All the attributes are required.");
            return { status: 400, detail: { message: "All the attributes are required." }};
        }

        this.#readProducts();

        const codeExist = this.products.find(product => product.code === code);
        if (codeExist){
            console.log("The code already exists.");
            return { status: 400, detail: { message: "The code already exists."}};
        }

        const product = {
            id: this.#getMaxId() + 1,
            title,
            description,
            price,
            status: true,
            thumbnails,
            code,
            stock
        };

        this.products.push(product);
        this.#writeProducts(this.products);
        console.log("Product added!");
        return { status: 201, detail: { message: "Product added!" }};
    }

    getProducts(){
        this.#readProducts();
        return this.products;
    }

    getProductById(productId){
        this.#readProducts();
        const productById = this.products.find(product => product.id === productId);
        const result = productById || PRODUCT_NOT_EXIST;
        console.log(result);
        return result !== PRODUCT_NOT_EXIST ? 
        { status: 200, detail: result} :
        { status: 404, detail: { message: PRODUCT_NOT_EXIST }};
    }

    updateProduct(productId, productToUpdate){
        this.#readProducts();
        const productById = this.getProductById(productId);
        if(productById.status !== 404){
            const newProduct = {
                id: productId,
                ...productToUpdate,
            }
            this.products = this.products.filter(product => product.id !== productId);
            this.products.push(newProduct);
            this.#writeProducts(this.products);
            console.log("Product Updated!")
            return { status: 200, detail: { message: "Product Updated!" }};
        } 
        console.log(productById);
        return { status: 404, detail: { message: PRODUCT_NOT_EXIST }};
    }

    deleteProduct(productId){
        const productToDelete = this.getProductById(productId);
        if(productToDelete.status !== 404){
            this.products = this.products.filter(product => product.id !== productId);
            this.#writeProducts(this.products);
            console.log("Product Deleted!");
            return { status: 200, detail: { message: "Product Deleted!" }};
        }
        console.log(productToDelete);
        return { status: 404, detail: { message: PRODUCT_NOT_EXIST }};
    }

    #getMaxId() {
        let maxId = 0;
        this.products.forEach(product => product.id > maxId && (maxId = product.id));
        return maxId;
    }

    #readProducts() {
        if(fs.existsSync(this.path)){
            const products = JSON.parse(fs.readFileSync(this.path), "utf-8");
            this.products = products;
        }
      }
    
    #writeProducts(products){
        try {
            let productsToWrite = JSON.stringify(products, null, 2);
            fs.writeFileSync(this.path, productsToWrite);
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
}

export default new ProductManager();