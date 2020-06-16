const { createProxyMiddleware } = require('http-proxy-middleware');

const addressGroup = {
  api: 'http://localhost:5005'
}
module.exports = function expressMiddleware (app) {
  const { MOCK } = process.env;
  let target = addressGroup[MOCK] || addressGroup['api'];
  app.use(createProxyMiddleware('/demo', { target, changeOrigin: true }));
}