import express from "express";
import * as bmiCheck from "./bmiCalculator";
import * as exerciseCalc from './exerciseCalculator';
//import qs from "qs";
const app = express();
app.use(express.json());


app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});


app.get("/bmi", (req, res) => {
  console.log(req.query);

  const height = req.query.height as string;
  const weight = req.query.weight as string;

  try {
    const { h, w } = bmiCheck.parseBmi([height, weight]);
    const result = bmiCheck.calculateBmi(h, w);
    res.json(result);
  } catch (e) {
    res.json({ error: "malformatted parameters" });
  }
});

app.post("/exercises", (req, res) => {
  //eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body = req.body;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!body.target || ! body.daily_exercises) {
    return res.status(400).send({error: 'parameters missing'});
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const target = body.target as number;
    let daily_exercises: number[] = [];
    try{
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      daily_exercises = body.daily_exercises.map((i: number) => Number(i));
    } catch(e) {
      return res.status(400).send({error: "malformatted parameters"});
    }
    if (isNaN(target) || daily_exercises.includes(NaN)) {
      return res.status(400).send({error: 'malformatted parameters'});
    }

    //eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result: exerciseCalc.Result = exerciseCalc.calculateExercises(daily_exercises, target);
  
    return res.send(result);
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
