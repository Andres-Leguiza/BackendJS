import passport from "passport";
import passportGithub from 'passport-github2';
import { UserModel } from "../models/user.model.js";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

passport.serializeUser(function (user, done) {
    console.log("Serializing");
    done(null, user._id);
});
  
passport.deserializeUser(function (_id, done) {
    console.log("Deserializing");
    UserModel.findById(_id, function (err, user) {
        done(err, user);
    });
});

passport.use('github', new passportGithub.Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  }, async function (accessToken, refreshToken, profile, done) {
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
}));

export default passport;