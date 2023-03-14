import dotenv from 'dotenv';
dotenv.config();
import { Command } from "commander";
const program = new Command();

program.option("-p, --persistence <type>","Selected Persistence/DAO").parse();

export default {
    port: process.env.PORT || 3000,
    persistence: program.opts().persistence || process.env.PERSISTENCE || 'MONGO',
    mongoURI: process.env.MONGO_URI,
    secret: process.env.SECRET,
    gitHubClientId: process.env.CLIENT_ID,
    gitHubClientSecret: process.env.CLIENT_SECRET,
    gitHubCallbackURL: process.env.CALLBACK_URL
}