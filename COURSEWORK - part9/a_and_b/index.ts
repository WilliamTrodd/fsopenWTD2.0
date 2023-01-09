import express from "express"; //importing this way gives us access to more datatypes sort-of..
import { calculator } from "./calculator";
const app = express();

app.get("/ping", (_request, response) => {
  response.send("pong");
});

app.post("/calculate", (req, res) => {
  const { value1, value2, op } = req.body;

  const result = calculator(value1, value2, op);
  res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
