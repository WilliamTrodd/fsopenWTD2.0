import express from "express";
import * as bmiCheck from "./bmiCalculator";
//import qs from "qs";
const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  console.log(req.query);

  const height = req.query.height as string;
  const weight = req.query.weight as string;
  console.log(height);
  console.log(weight);

  try {
    const { h, w } = bmiCheck.parseBmi([height, weight]);
    const result = bmiCheck.calculateBmi(h, w);
    res.json(result);
  } catch (e) {
    res.json({ error: "malformatted parameters" });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
