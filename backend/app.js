require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);

app.get("/", (req, res) => res.send("API running"));

app.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.PORT}`)
);