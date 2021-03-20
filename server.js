const express = require("express");
const app = express();
const mongoURI = require("./config/config").mongoURI;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const admin = require("./routes/admin");
const user = require("./routes/user");

const PORT = process.env.PORT || 4444;

mongoose.connect(
  mongoURI,
  { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false },
  () => {
    console.log("Db Connected");
  }
);

require("./config/passport")(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", admin);
app.use("/", user);

app.listen(PORT, () => {
  console.log(`App is up and running on ${PORT}`);
});
