const { spawn } = require("child_process");
let fs = require("fs");

const handleUploadResponse = (err, res, data, name) => {
  if (err) {
    res.json({
      error: true,
      message: data.message,
      data: { data },
    });
  } else {
    res.json({
      error: false,
      message: "NEJC",
      data: null,
    });
  }

  fs.rmSync(`./src/temp/${name}`, {
    recursive: true,
    force: true,
  });
};

const fileUpload = async (req, res) => {
  if (req.file) {
    const ls = spawn("python", [
      "./src/scripts/main.py",
      req.file.path,
      req.file.filename,
      req.file.mimetype,
    ]);

    ls.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
      handleUploadResponse(false, res, data, req.file.filename);
    });

    ls.stderr.on("data", (data) => {
      console.log(`stderr: ${data}`);
      handleUploadResponse(true, res, data, req.file.filename);
    });

    ls.on("close", (code) => {
      console.log(`Child process exited with code ${code}`);
      handleUploadResponse(false, res, code, req.file.filename);
    });
  }
};

module.exports = { fileUpload };
