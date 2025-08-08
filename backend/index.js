require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");


const PORT = process.env.PORT || 5000;

const playerRouter = require("./routes/player.routes");

const partnerRouter = require("./routes/partner.routes");

const adminRouter = require("./routes/admin.routes");

const db = require("./config/db");

// connectdb
db();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// Player Routes
app.use("/api/v1/player", playerRouter);


// Partner Routes
app.use("/api/v2/partner", partnerRouter);


// Admin Routes
app.use("/api/v3/admin", adminRouter);


// Serve static files from the React app

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});