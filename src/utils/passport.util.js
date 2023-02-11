import passport from "passport";
import passportGithub from 'passport-github2';
import { UserModel } from "../models/user.model.js";
import { githubLoginRegister } from '../middlewares/github.middleware.js';
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
  }, githubLoginRegister));

export default passport;