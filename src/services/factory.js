import config from '../config/config.js';
import { PERSISTENCE } from '../constants/constants.js';
import MongoSingleton from '../config/db.js';
import { UserRepository } from './userDAOs/user.repository.js';
import { ProductRepository } from './productDAOs/product.repository.js';
import { CartRepository } from './cartDAOs/cart.repository.js';


let factory;
switch(config.persistence){
    case PERSISTENCE.MONGO:
        if(config.mongoURI) await MongoSingleton.getInstance();
        const userMongo = await import ('./userDAOs/user.service.js');
        const productMongo = await import ('./productDAOs/product.service.js');
        const cartMongo = await import ('./cartDAOs/cart.service.js');
        factory = { 
            user: new UserRepository(userMongo),
            product: new ProductRepository(productMongo),
            cart: new CartRepository(cartMongo)
        };
        break;
    case PERSISTENCE.FILE:
        break;
    default: 
        break;
}

export default factory;