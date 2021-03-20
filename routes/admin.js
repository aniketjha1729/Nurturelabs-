const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");

router.post("/admin/advisor", (req, res) => {
  const { advisorName, advisorPhoto } = req.body;
  if (!advisorName || !advisorPhoto) {
    return res.status(400).json({});
  }
  const newAdmin = new Admin({
    advisorName,
    advisorPhoto,
  });
  newAdmin
    .save()
    .then((adminUser) => res.status(200).json({}))
    .catch((err) => {
      res.status(400);
    });
});

module.exports = router;
