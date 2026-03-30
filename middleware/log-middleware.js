import * as fs from "node:fs";

async function logMiddleware(req, res, next) {
    const log = `${Date.now()} - method: ${req.method} - path: ${req.path}\n`;
    fs.appendFile("server.log", log, (err) => {
        if(err) console.error(err);
    })
    next();
}

export default logMiddleware;