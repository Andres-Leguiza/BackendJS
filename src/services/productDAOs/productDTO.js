export default class ProductDTO {
    constructor(product){
        this.id = product._id || product.id;
        this.title = product.title;
        this.description = product.description;
        this.price = product.price;
        this.status = product.status;
        this.category = product.category;
        this.thumbnails = product.thumbnails;
        this.code = product.code;
        this.stock = product.stock;
        this.owner = product.owner;
        this.createdAt = product.createdAt;
        this.updatedAt = product.updatedAt;
    }
}