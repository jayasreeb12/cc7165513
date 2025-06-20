// server.js (MongoDB version)
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv\config");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Transaction schema and model
const transactionSchema = new mongoose.Schema({
  category: String,
  amount: Number,
  note: String,
}, { timestamps: true });

const Transaction = mongoose.model("Transaction", transactionSchema);

// Routes
app.get("/", (req, res) => {
  res.send("Finance Management API is running!");
});

// Get all transactions
app.get("/api/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
});

// Get a single transaction
app.get("/api/transactions/:id", async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ message: "Not found" });
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ message: "Error fetching transaction" });
  }
});

// Add a new transaction
app.post("/api/transactions", async (req, res) => {
  try {
    const newTx = new Transaction(req.body);
    const saved = await newTx.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Failed to add transaction" });
  }
});

// Update a transaction
app.put("/api/transactions/:id", async (req, res) => {
  try {
    const updated = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Failed to update" });
  }
});

// Delete a transaction
app.delete("/api/transactions/:id", async (req, res) => {
  try {
    const deleted = await Transaction.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete" });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});