const express = require("express");
const router = express.Router();
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const keys = require("../config/config").secretOrKey;
var bcrypt = require("bcryptjs");
const Admin = require("../models/admin");
const passport = require("passport");

router.post(
  "/user/:userid/advisor/:advisorid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Admin.findById(req.params.advisorid).then((booking) => {
      const newBooking = {
        bookingTime: req.body.bookingTime,
        user: req.user.id,
        email: req.body.email,
        name: req.body.name,
      };
      booking.bookings.unshift(newBooking);
      booking.save().then((booking) => res.status(200).json(booking));
    });
  }
);

router.post("/user/register", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({});
  }
  User.findOne({ email: email }).then((user) => {
    if (user) {
      return res.status(400).json({
        email: "Email already exists",
      });
    } else {
      const newUser = new User({
        email,
        name,
        password,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            return res.status(500).json({});
          }
          var token = jwt.sign({}, keys, {
            expiresIn: 86400,
          });
          newUser.password = hash;
          newUser
            .save()
            .then((user) =>
              res.status(200).json({ token: "Bearer " + token, id: user._id })
            )
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

router.post("/user/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({});
  }
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(404).json({ user: "User Not found" });
    }
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) {
        return res.status(401).json({});
      }
      const payload = { id: user.id, name: user.name };
      jwt.sign(payload, keys, { expiresIn: 86400 }, (err, token) => {
        res.json({
          token: "Bearer " + token,
          id: user._id,
        });
      });
    });
  });
});

router.get("/user/:userid/advisor", (req, res) => {
  Admin.find()
    .select("-date")
    .select("-__v")
    .select("-bookings")
    .then((allAdvisor) => {
      res.status(200).json({ allAdvisor });
    });
});

module.exports = router;
