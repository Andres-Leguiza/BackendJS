export default class UserDTO {
    constructor(user){
        this.id = user._id || user.id;
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.email = user.email;
        this.githubUser = user.githubUser;
        this.age = user.age;
        this.role = user.role;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
    }
}