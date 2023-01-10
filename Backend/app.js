const express = require("express");
const connection = require("./db/connection");
const app = express();
const port = process.env.PORT || 5000;
var cors = require('cors')
// middleware
app.use(express.json());
app.use(cors())
app.get("/", (req, res) => {
  res.send("hello this is komal from other world");
});

// routes 
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// server listening

app.listen(port, () => {
  console.log(`server is listeniong on the port ${port}`);
});
