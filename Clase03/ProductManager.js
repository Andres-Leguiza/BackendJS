const fs = require("fs");

class ProductManager {
    constructor() {
       this.products = [];
       this.path = "Products.json";
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
            console.log("The code already exist.");
            return "The code already exist.";
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
        console.log("Product added!");
    }

    getProducts(){
        this.#readProducts();
        console.log(this.products);
    }

    getProductById(productId){
        this.#readProducts();
        const productById = this.products.find(product => product.id === productId);
        console.log(productById || "El producto no Existe")
        return (productById || "El producto no Existe");
    }

    updateProduct(productId, productToUpdate){
        this.#readProducts();
        const newProduct = {
            id: productId,
            ...productToUpdate
        }
        this.products = this.products.filter(product => product.id !== productId);
        this.products.push(newProduct);
        this.#writeProducts(this.products);
        console.log("Product Updated!")
    }

    deleteProduct(productId){
        this.#readProducts();
        this.products = this.products.filter(product => product.id !== productId);
        this.#writeProducts(this.products);
        console.log("Product deleted!");
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

const testProduct1 = {
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25
}
const testProduct2 = {
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc124",
    stock: 25
}

const testProduct3 = {
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc125",
    stock: 25
}

const productManager = new ProductManager();
/* productManager.getProducts();
productManager.addProduct(testProduct1);
productManager.getProducts();
productManager.addProduct(testProduct1);
productManager.addProduct(testProduct2);
productManager.getProducts();
productManager.getProductById(1);
productManager.getProductById(2);
productManager.getProductById(3);
productManager.updateProduct(1, testProduct3);
productManager.getProducts();
productManager.deleteProduct(2);
productManager.getProducts(); */
