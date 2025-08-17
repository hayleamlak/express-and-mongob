const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // parse JSON request body

// Routes
app.use("/users", userRoutes);
mongodb://localhost:27017
// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/myappdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("MongoDB connected");
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})
.catch((err) => console.log(err));
