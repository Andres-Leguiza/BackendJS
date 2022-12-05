import fs from "fs";

const PRODUCT_NOT_EXIST = "This product does not exist.";

class ProductManager {
    constructor() {
       this.products = [];
       this.path = "./src/Products.json";
    }

    addProduct(productToAdd){

        const {title, description, price, thumbnail, code, stock} = productToAdd;
        
        if(!title || !description || (price !== 0 && !price) || !thumbnail || !code || (stock !== 0 && !stock)){
            console.log("All the attributes are required.");
            return "All the attributes are required.";
        }

        this.#readProducts();

        const codeExist = this.products.find(product => product.code === code);
        if (codeExist){
            console.log("The code already exists.");
            return "The code already exists.";
        }

        const product = {
            id: this.#getMaxId() + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        this.products.push(product);
        this.#writeProducts(this.products);
        return console.log("Product added!");
    }

    getProducts(){
        this.#readProducts();
        console.log(this.products);
        return this.products;
    }

    getProductById(productId){
        this.#readProducts();
        const productById = this.products.find(product => product.id === productId);
        console.log(productById || PRODUCT_NOT_EXIST)
        return (productById || PRODUCT_NOT_EXIST);
    }

    updateProduct(productId, key, value){
        this.#readProducts();
        const productById = this.getProductById(productId);
        if(productById !== PRODUCT_NOT_EXIST){
            const keys = Object.keys(productById)
            if(keys.includes(key)){
                const newProduct = {
                    id: productId,
                    ...productById,
                    [key]: value
                }
                this.products = this.products.filter(product => product.id !== productId);
                this.products.push(newProduct);
                this.#writeProducts(this.products);
                return console.log("Product Updated!");
            }
            return console.log(`The Key: ${key} is not valid.`);
        } return console.log(productById);
    }

    deleteProduct(productId){
        const productToDelete = this.getProductById(productId);
        if(productToDelete !== PRODUCT_NOT_EXIST){
            this.products = this.products.filter(product => product.id !== productId);
            this.#writeProducts(this.products);
            return console.log("Product Deleted!");
        }
        return console.log(productToDelete);
    }

    #getMaxId() {
        let maxId = 0;
        this.products.map((product) => {
            if (product.id > maxId) maxId = product.id;
        });
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

export default ProductManager;