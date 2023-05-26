import passport from "passport";
import {Strategy, ExtractJwt} from 'passport-jwt';
import passportGithub from 'passport-github2';
import { UserModel } from "../models/user.model.js";
import { githubLoginRegister } from '../middlewares/github.middleware.js';
import config from "../config/config.js";

passport.serializeUser(function (user, done) {
    console.log("Serializing");
    done(null, user._id);
});
  
passport.deserializeUser( async (_id, done) => {
    console.log("Deserializing");
    try {
      const user = await UserModel.findById(_id);
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error){
      return done(error);
    }
});

passport.use("current", new Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret
  }, async function (jwtPayload, done) {
        done(null, jwtPayload.user);
  }));

passport.use('github', new passportGithub.Strategy({
    clientID: config.gitHubClientId,
    clientSecret: config.gitHubClientSecret,
    callbackURL: config.gitHubCallbackURL
  }, githubLoginRegister));

export default passport;