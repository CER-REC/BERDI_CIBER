const proxy = require('http-proxy-middleware');
require('dotenv').config();

module.exports = (router) => {
  router.use('/berdi/graphql', proxy(process.env.MIDDLEWARE_PROXY_ADDRESS));
};
