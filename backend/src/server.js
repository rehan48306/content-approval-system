const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const contentRoutes = require("./routes/contentRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());


app.use("/content", contentRoutes);

app.get("/", (req, res) => {
  res.send("API Running...");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});