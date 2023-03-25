import { faker } from '@faker-js/faker';
import CustomError from './../utils/customError.js';
import { ERRORS } from '../constants/errors.js';

faker.locale = 'en';

export async function mockProducts(req, res){
    let mockedProducts = [];
    try {
        for(let i = 0; i < 100; i++){
            mockedProducts.push(generateProduct());
        }
        res.json(mockedProducts);
    } catch (error) {
        next(CustomError.createError(ERRORS.UNHANDLED_ERROR));
    }
}

function generateProduct(){
    let image = (imageNbr) => faker.image.imageUrl(null, null, imageNbr);
    return {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        status: faker.datatype.boolean(),
        category: faker.commerce.product(),
        thumbnails: faker.helpers.uniqueArray([image("image1"), image("image2"), image("image3"), image("image4"), image("image5")], 2),
        code: faker.random.alphaNumeric(5),
        stock: faker.datatype.number(500),
        createdAt: faker.datatype.datetime({ min: Date.now(), max: Date.now() }),
        updatedAt: faker.datatype.datetime({ min: Date.now(), max: 1837560263263 })
    }
}