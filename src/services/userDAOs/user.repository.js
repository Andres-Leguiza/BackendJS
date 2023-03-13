import UserDTO from './userDTO.js';

export class UserRepository {
    constructor(dao){
        this.dao = dao;
    }

    async createUser(data){
        const user = await this.dao.createUser(data);
        const userDTO = new UserDTO(user);
        return userDTO;
    }

    async getUser(email){
        const user = await this.dao.getUser(email);
        const userDTO = user ? new UserDTO(user) : null;
        return userDTO; 
    }
}