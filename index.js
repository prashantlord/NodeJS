import express from "express";
import fs from "fs";
import mockData from "./MOCK_DATA.json" with { type: "json" };
import { json } from "stream/consumers";

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.name = req.search_query;
  console.log("middleware called");
  next();
});

app.get("/users", (req, res) => {
  const html = `
    <ul>
      ${mockData.map((item) => `<li>${item.first_name}</li>`).join("")}
    </ul>
  `;
  res.send(html);
});

app.route("/api/users").get((req, res) => {
  res.json(mockData);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
