const express = require("express");
const proxy = require("express-http-proxy");
const history = require("connect-history-api-fallback");
const path = require("path");
// const fs = require("fs");
const app = express();
const port = 3000;

const ProxyAddress = {
  HOST: "http://192.168.0.37",
  PORT: "8081",
};

const proxyAddress = `${ProxyAddress.HOST}:${ProxyAddress.PORT}`;

//历史模式
app.use(
  history({
    verbose: true,
  })
);

app.use(express.static("./dist"));

app.use(
  "/prod-api",
  proxy(proxyAddress, {
    proxyReqOptDecorator: function (proxyReqOpts, srcReq) {
      proxyReqOpts.path = proxyReqOpts.path.replace("/prod-api", "");
      return proxyReqOpts;
    }
  })
);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
