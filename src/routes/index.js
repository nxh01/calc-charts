const express = require("express");
const router = express.Router();

let fs = require("fs");

const multer = require("multer");

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../temp/");
  },
  filename: function (req, file, cb) {
    console.log(file.mimetype);
  },
});

const upload = multer({ dest: "../temp/" });

const { spawn } = require("child_process");

router.get("/", (req, res) => {
  res.json({
    error: false,
    message: "NEJC Endpoint",
    data: null,
  });
});

router.post("/", upload.single("dataset"), async (req, res) => {
  if (req.file) {
    const ls = spawn("python", [
      "./src/scripts/main.py",
      req.file.path,
      req.file.filename,
      req.file.mimetype,
    ]);
    ls.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
      res.json({
        error: false,
        message: "NEJC Endpoint",
        data: null,
      });
      fs.rmSync(`../temp/${req.file.filename}`, {
        recursive: true,
        force: true,
      });
    });

    ls.stderr.on("data", (data) => {
      console.log(`stderr: ${data}`);
      res.json({
        error: true,
        message: data.message,
        data: { data },
      });
      fs.rmSync(`./src/temp/${req.file.filename}`, {
        recursive: true,
        force: true,
      });
    });

    ls.on("close", (code) => {
      console.log(`Child process exited with code ${code}`);
      res.json({
        error: false,
        message: "NEJC Endpoint",
        data: null,
      });
      fs.rmSync(`./src/temp/${req.file.filename}`, {
        recursive: true,
        force: true,
      });
    });
  }
});

module.exports = router;
