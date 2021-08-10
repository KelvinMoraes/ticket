const fs = require('fs');
const path = require('path');
const moment = require('moment');
const winston = require('winston');

const pkg = require('../package.json');
const logPath = path.resolve(__dirname, '../logs');

const level = process.env.NODE_ENV === 'development'
    ? 'debug'
    : 'info';

if (!fs.existsSync(logPath)) {

    fs.mkdirSync(logPath);
}

winston.setLevels( winston.config.npm.levels );
winston.addColors( winston.config.npm.colors );

const logger = new (winston.Logger)({

    transports: [

        new (winston.transports.File)({
            name: `${pkg.name}-error.log`,
            filename: `${logPath}/${pkg.name}-error.log`,
            level: 'error',
            maxsize: 100000,
            maxFiles: 10,
            timestamp: () => moment().format('YYYY-MM-DD HH:mm:ss')
        }),

        new (winston.transports.File)({
            name: `${pkg.name}-${level}.log`,
            filename: `${logPath}/${pkg.name}-${level}.log`,
            level: level,
            maxsize: 100000,
            maxFiles: 10,
            timestamp: () => moment().format('YYYY-MM-DD HH:mm:ss')
        }),

        new (winston.transports.Console)({
            level: 'warn',
            colorize: true
        })
    ],
    exceptionHandlers: [
        new winston.transports.File({
            filename: `${logPath}/${pkg.name}-exceptions.log`
        })
    ]
});

module.exports = logger;
