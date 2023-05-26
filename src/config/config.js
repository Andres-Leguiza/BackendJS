import dotenv from 'dotenv';
dotenv.config();
import { Command } from "commander";
const program = new Command();

program.option("-p, --persistence <type>","Selected Persistence/DAO").parse();

export default {
    port: process.env.PORT || 3000,
    persistence: program.opts().persistence || process.env.PERSISTENCE || 'MONGO',
    node_env: process.env.NODE_ENV || 'dev',
    mongoURI: process.env.MONGO_URI,
    secret: process.env.SECRET,
    mailer_user: process.env.MAILER_USER,
    mailer_secret: process.env.MAILER_SECRET,
    stripeSecret: process.env.STRIPE_SECRET,
    gitHubClientId: process.env.CLIENT_ID,
    gitHubClientSecret: process.env.CLIENT_SECRET,
    gitHubCallbackURL: process.env.CALLBACK_URL,
    appDomain: process.env.APP_DOMAIN
}