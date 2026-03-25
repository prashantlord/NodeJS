// import * as math from "./math.js";
// console.log(math);
// console.log(math.add(1, 2));
// console.log(math.sub(1, 2));
// console.log(math.mul(1, 2));
// console.log(math.div(1, 2));

import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
  const log = `Request Received from - ${req.rawHeaders[3]} - ${Date.now()}\n`;
  fs.appendFile("server.log", log, (err) => {
    if (err) {
      fs.appendFile("error.log", `${Date.now()} - ${err.message}`);
    }

    res.end("Hello");
  });
});

server.listen(3000, (req, res) => {
  console.log("Server is running");
});
