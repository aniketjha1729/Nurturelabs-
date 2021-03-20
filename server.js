const express = require("express");
const app = express();
const {mongoURI} = require("./config/config");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const admin = require("./routes/admin");
const user = require("./routes/user");

const PORT = process.env.PORT || 4444;

mongoose.connect(mongoURI,{
  useNewUrlParser:true,
  useUnifiedTopology: true,
  useFindAndModify:false,
})
mongoose.connection.on('connected',()=>{
  console.log("conneted to mongo yeahh")
})
mongoose.connection.on('error',(err)=>{
  console.log("err connecting",err)
})

require("./config/passport")(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", admin);
app.use("/", user);

app.listen(PORT, () => {
  console.log(`App is up and running on ${PORT}`);
});
