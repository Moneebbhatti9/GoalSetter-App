const express = require("express");
const dontenv = require("dotenv").config();
const colors = require("colors");
const connectDB = require("./config/db");
const { errorHandler } = require("./Middleware/errorMiddleware");
const port = process.env.PORT || 8000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./Routes/goalsRoutes"));
app.use("/api/users", require("./Routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
