import express from "express"; //importing this way gives us access to more datatypes sort-of..
const app = express();

app.get("/ping", (_request, response) => {
  response.send("pong");
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
