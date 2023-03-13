import ProductDTO from "./productDTO.js";

export default class ProductListDTO {
    constructor(products){
        this.productList = products.docs.map(product => new ProductDTO(product._doc));
        this.totalDocs = products.totalDocs;
        this.limit = products.limit;
        this.totalPages = products.totalPages;
        this.page = products.page;
        this.pagingCounter = products.pagingCounter;
        this.hasPrevPage = products.hasPrevPage;
        this.hasNextPage = products.hasNextPage;
        this.prevPage = products.prevPage;
        this.nextPage = products.nextPage;
    }
}