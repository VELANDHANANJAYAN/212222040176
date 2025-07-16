const fs= require('fs');
const path =require('path');
const logPath = path.join(__dirname, '../logs/access.log');
module.exports = (req, res, next) => {
    const log = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}\n`;
    fs.appendFileSync(logPath, log);
    next();
};
