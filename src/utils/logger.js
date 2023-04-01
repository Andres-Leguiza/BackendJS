import { createLogger, transports, format } from 'winston';
import config from "../config/config.js";

const customLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: "red",
        error: "magenta",
        warning: "yellow",
        info: "green",
        http: "blue",
        debug: "cyan"
    }
}

const logger = createLogger({
    levels: customLevels.levels
});

const dev = new transports.Console({
    level: "debug",
    format: format.combine(format.colorize({colors: customLevels.colors}), format.simple())
});

const prod = new transports.File({
    level: "error",
    filename: "./src/logs/errors.log",
    format: format.combine(
      format.timestamp(),
      format.prettyPrint(),
    ),
});

if (config.node_env === 'prod'){
    logger.level = 'info';
    logger.add(prod);
} else {
    logger.add(dev);
}

export default logger;