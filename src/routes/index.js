const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer({ dest: "../temp/" });

const uploadController = require("../controllers/upload.controller");

router
  .route("/")
  .get(() => {
    res.json({ error: false, message: "NEJC", data: null });
  })
  .post(upload.single("dataset"), uploadController.fileUpload);

module.exports = router;
