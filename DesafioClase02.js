class ProductManager {
    constructor() {
       this.products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock){
        
        if(!title || !description || (price !== 0 && !price) || !thumbnail || !code || (stock !== 0 && !stock)){
            console.log("All the attributes are required.");
            return "All the attributes are required.";
        }

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
    }

    getProducts(){
        console.log(this.products);
        return this.products;
    }

    getProductById(productId){
        const productById = this.products.find(product => product.id === productId);
        return console.log(productById || "NOT FOUND");
    }

    #getMaxId() {
        let maxId = 0;
        this.products.map((product) => {
            if (product.id > maxId) maxId = product.id;
        });
        return maxId;
    }
}


const productManager = new ProductManager();
productManager.getProducts();
productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
productManager.getProducts();
productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
productManager.getProductById(1);
productManager.getProductById(2);