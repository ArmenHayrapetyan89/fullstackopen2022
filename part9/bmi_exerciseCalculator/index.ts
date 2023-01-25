import express from "express";
import { calculateBmi } from "./bmiCalculator";
import bodyParser from "body-parser";
import { exerciseCalculator } from "./exerciseCalculator";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*app.get("/bmi", (_req, res) => {
  res.send("Hello Full Stack!");
});*/

app.get("/bmi", (req, res) => {
  try {
    const height = parseInt(req.query.height as string);
    const weight = parseInt(req.query.weight as string);

    const bmi = calculateBmi(height, weight);
    res.json({ weight, height, bmi });
  } catch (error) {
    res.json({ error: "malformatted parameters" });
  }
});

app.post("/calculator", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = exerciseCalculator(daily_exercises, target);
    res.json(result);
  } catch (error) {
    res.json({ error: "malformatted parameters" });
  }
});
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
