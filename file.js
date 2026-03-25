import * as fs from "fs";

// sync create new file with text
fs.writeFileSync("./hello.txt", "Hello from prashant");

// async create new file with text
fs.writeFile("./hello.txt", "Hello from prashant", (err) => console.error(err));

fs.readFile("./hello.txt", "utf-8", (err, res) => {
  if (err) {
    console.log("Error");
  } else console.log(res);
});

const fileRead = fs.readFileSync("./hello.txt", "utf-8");
console.log(fileRead);

fs.appendFileSync("./server.log", `Prashant Logged in at ${Date.now()}\n`);
fs.appendFile("./server.log", `Prashant Logged in at ${Date.now()}\n`, (err) =>
  console.log(err),
);
