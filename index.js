// import * as math from "./math.js";
// console.log(math);
// console.log(math.add(1, 2));
// console.log(math.sub(1, 2));
// console.log(math.mul(1, 2));
// console.log(math.div(1, 2));

import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
  const log = `Request Received from - ${req.rawHeaders[3]} - (${req.url}) - ${Date.now()}\n`;
  fs.appendFile("server.log", log, (err) => {
    if (err) {
      fs.appendFile("error.log", `${Date.now()} - ${err.message}`);
    }

    switch (req.url) {
      case "/":
        res.end("Landing Page");
        break;
      case "/home":
        res.end("Home Page");
        break;
      case "/dashboard":
        res.end("Dashboard Page");
        break;
      case "/about":
        res.end("About Page");
        break;
      case "/contact":
        res.end("Contact Page");
        break;
      default:
        res.end("Default Page");
        break;
    }
  });
});

server.listen(3000, (req, res) => {
  console.log("Server is running");
});
