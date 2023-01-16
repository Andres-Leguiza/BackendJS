const socket = io();

socket.on('updateProducts', products => {
    console.log(products);
    updateProductList(products);
});

let updateProductList = (products) => {
    let container = document.getElementById("productsContainer");
    container.innerHTML = "";
    products.forEach(product => {
        let card = document.createElement("div");
        card.style = "width: 18rem;";
        card.classList.add('card', 'my-3', 'ms-5');
        let title = document.createElement("h5");
        title.innerText = product.title;
        title.classList.add('card-header', 'd-flex', 'justify-content-center');
        card.append(title);
        let bodyDiv = document.createElement("div");
        bodyDiv.classList.add('card-body');
        let id = document.createElement("p");
        id.innerText = `Id: ${product._id}`;
        let description = document.createElement("p");
        description.innerText = `Descripcion: ${product.description}`;
        let price = document.createElement("p");
        price.innerText = `Precio: $${product.price}`;
        let code = document.createElement("p");
        code.innerText = `Código: ${product.code}`;
        let stock = document.createElement("p");
        stock.innerText = `Stock: ${product.stock}`;
        bodyDiv.append(id);
        bodyDiv.append(description);
        bodyDiv.append(price);
        bodyDiv.append(code);
        bodyDiv.append(stock);
        card.append(bodyDiv);
        container.append(card);
    });
}
