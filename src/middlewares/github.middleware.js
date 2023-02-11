import { UserModel } from "../models/user.model.js";
import bcrypt from 'bcrypt';

export async function githubLoginRegister(accessToken, refreshToken, profile, done) {
    try {
        let user = await UserModel.findOne({ email: profile._json.email});
        if(!user){
            const displayName = profile.displayName.split(' ');
            const newUser = {
                first_name: displayName[0],
                last_name: displayName[1],
                age: 21,
                email:profile._json.email,
                githubUser: true,
                password: bcrypt.hashSync('0', bcrypt.genSaltSync(10))
            }
            user = await UserModel.create(newUser);
            delete user._doc.password;
            done(null, user._doc);
        } else {
            delete user._doc.password;
            done(null, user._doc);
        }
    } catch (error) {
      throw new Error(error.message)
    }
}