import express from "express";
import fs from "fs";
import mockData from "./MOCK_DATA.json" with { type: "json" };
import { json } from "stream/consumers";

const app = express();
const PORT = 3000;

app.get("/users", (req, res) => {
  const html = `
    <ul>
      ${mockData.map((item) => `<li>${item.first_name}</li>`).join("")}
    </ul>
  `;
  res.send(html);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    res.json(mockData);
  })
  .post((req, res) => {})
  .put((req, res) => {})
  .patch((req, res) => {})
  .delete((req, res) => {});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
