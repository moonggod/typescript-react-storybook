const { createProxyMiddleware } = require('http-proxy-middleware');

const addressGroup = {
  api: {
    REACT_APP_API_ADDRESS: 'http://localhost:7007',
    REACT_APP_API_PREFIX: '/message'
  },
  env: {
    REACT_APP_API_ADDRESS: 'http://api.dev2.gfashion.gfashion2020.tk',
    REACT_APP_API_PREFIX: '/message'
  }
}
module.exports = function expressMiddleware (app) {
  const { MOCK } = process.env;
  let {REACT_APP_API_PREFIX, REACT_APP_API_ADDRESS} = addressGroup[MOCK] || addressGroup['api'];
  app.use(createProxyMiddleware(REACT_APP_API_PREFIX, { target: REACT_APP_API_ADDRESS, changeOrigin: true }));
}