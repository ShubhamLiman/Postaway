// import { json } from "body-parser";
import winston from "winston";
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //
      new winston.transports.File({ filename: 'logs.txt'})
    ],
  });

export const loggermiddleware = (req,res,next) =>{
    if(!req.url.includes("signin") || !req.url.includes("signup")){
        logger.info(`${new Date()} req URL: ${req.url} reqBody: ${JSON.stringify(req.body)}`);
    }
    next();
}

