const express = require("express");
const app = express();

const cors = require("cors");

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/", require("./src/routes/index"));

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`App listening on port ${PORT}`));
