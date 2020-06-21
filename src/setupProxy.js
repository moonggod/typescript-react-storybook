const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  const { MOCK } = process.env;
  let target = process.env.REACT_APP_API_ADDRESS;
  if (MOCK === "api") {
    target = process.env.REACT_APP_API_MOCK_ADDRESS;
  }
  app.use(createProxyMiddleware("/message", { target, changeOrigin: true }));
};
