import UserSummaryDTO from "./userSummaryDTO.js";

export default class UsersDTO {
    constructor(users){
        this.users = users.map(user => new UserSummaryDTO(user._doc));
    }
}