global.$CONSTS = {
 };

let dotenv = require('dotenv');
global.$path = require('path');
/**
* Load variable of .env to process.env
*/
global.BASE_PATH = $path.resolve(__dirname, './')
global.APP_PATH = $path.join(BASE_PATH, '/app');
global.IMG_PATH = $path.join(BASE_PATH, '/img');
global.COMMON_PATH = $path.join(APP_PATH, '/Common');
global.GLOBALS_PATH = $path.join(APP_PATH, '/Globals');
global.MODULES_PATH = $path.join(APP_PATH, '/Modules');

dotenv.config({ path: $path.join(BASE_PATH, '/.env') });
global.$env = process.env;

global.$logger = require($path.join(BASE_PATH, '/Logger'));

let express = require(APP_PATH);

global.$extend = require('deep-extend');

const moment = require('moment');
const MomentRange = require('moment-range');
global.$moment = MomentRange.extendMoment(moment);

global.$axios = require('axios');

const { APP_PORT, APP_HOST, AXIOS_PROTOCOL, AXIOS_HOST, AXIOS_PORT, AXIOS_PATH } = $env;

$axios.defaults.baseURL = `${AXIOS_PROTOCOL}://${AXIOS_HOST}:${AXIOS_PORT}/${AXIOS_PATH}`;
$axios.defaults.headers.post['Content-Type'] = 'application/json';

express.listen(APP_PORT, APP_HOST, () => console.log('APP run on %s port %s ', APP_HOST, APP_PORT));
