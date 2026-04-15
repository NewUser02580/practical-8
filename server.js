const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

mongoose.connect("mongodb+srv://dhirshah123:dhirshah123@cluster0.rgccibd.mongodb.net/?appName=Cluster0")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/uploads", express.static("uploads"));

// Payment API ← ADD THIS
app.post("/api/payment", (req, res) => {
  const { amount } = req.body;
  if (amount > 0) {
    res.json({ status: "success" });
  } else {
    res.status(400).json({ status: "failed" });
  }
});

app.listen(5000, () => console.log("Server started"));