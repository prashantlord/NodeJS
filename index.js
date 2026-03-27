import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send(`Hello to the home page ${req.query.name}`);
});

app.get("/about", (req, res) => {
  res.send(`hello in the about page ${req.query.name}`);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
