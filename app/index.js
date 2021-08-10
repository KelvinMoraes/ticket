const path = require('path');
let http = require('http');
let express = require('express');

let helmet = require('helmet');
let cors = require('cors');
let consign = require('consign');

let AppValidator = require($path.join(COMMON_PATH, 'Validator/AppValidator.js'));
let ErrorHandler = require('./Common/Middleware/ErrorHandler');

let expressValidator = require('express-validator');


const exp = express();

exp.set('view engine', 'ejs');
exp.set('views', path.join(__dirname, '/Views'));

exp.use(helmet.hidePoweredBy());
exp.use(helmet.xssFilter());
exp.use(helmet.noSniff());
exp.use(helmet.referrerPolicy({
    policy: 'no-referrer'
}))

exp.use(cors({
    exposedHeaders: ['Content-Disposition']
}));

exp.use((req, res, next) => {
    try {

        // VALIDAÇÃO DE LOGIN E AFINS
       
        return next();
       
    } catch (e) {

        $logger.error(e);
        return res.status(500).json(e);
    }
});


exp.use(expressValidator({
    customValidators: AppValidator
}));

consign({ cwd: COMMON_PATH })
    .include('/Router')
    .into(exp);

exp.use(ErrorHandler);

module.exports = http.createServer(exp);
