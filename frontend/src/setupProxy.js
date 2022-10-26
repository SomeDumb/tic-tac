const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://backend:8000",
      changeOrigin: true,
      logLevel: "debug",
    })
  );
  app.use(
    createProxyMiddleware("/ws/room", {
      target: "ws://backend:8000",
      ws: true,
      changeOrigin: true,
      logLevel: "debug",
    })
  );
};
