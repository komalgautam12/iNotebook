const mongoose = require("mongoose");

mongoose
  .connect("mongodb://0.0.0.0:27017/NotesDatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection successful");
  })
  .catch((error) => {
    console.log(error);
  });

  