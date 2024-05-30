import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

app.use(
  "/api",
  createProxyMiddleware({
    target: "https://api.themoviedb.org",
    changeOrigin: true,
    pathRewrite: {
      "^/api": "", // remove /api prefix
    },
  })
);

app.listen(3000, () => {
  console.log("Proxy server is running on http://localhost:3000");
});
