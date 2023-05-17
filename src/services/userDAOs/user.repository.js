import UserDTO from './userDTO.js';
import UsersDTO from './usersDTO.js';

export class UserRepository {
    constructor(dao){
        this.dao = dao;
    }

    async getUsers(){
        const users = await this.dao.getUsers();
        const usersDTO = new UsersDTO(users);
        return usersDTO;
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

    async getUserById(id){
        const user = await this.dao.getUserById(id);
        const userDTO = user ? new UserDTO(user) : null;
        return userDTO; 
    }

    async updateUser(email, data, updatePassword){
        const user = await this.dao.updateUser(email, data, updatePassword);
        const userDTO = user ? new UserDTO(user) : null;
        return userDTO;
    }

    async deleteUser(email){
      await this.dao.deleteUser(email);  
    }

    async deleteUsers(){
        await this.dao.deleteUsers();
    }
}