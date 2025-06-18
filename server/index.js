const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;
const DATA_PATH = path.join(__dirname, "data", "transactions.json");

app.use(cors());
app.use(express.json());

// Helper functions
const readTransactions = () => JSON.parse(fs.readFileSync(DATA_PATH));
const writeTransactions = (data) => {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
};

// Routes
app.get("/", (req, res) => {
  res.send("Finance Management API is running!");
});

// Get all transactions
app.get("/api/transactions", (req, res) => {
  try {
    const transactions = readTransactions();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Error reading transactions data" });
  }
});

// Get single transaction by ID
app.get("/api/transactions/:id", (req, res) => {
  const transactions = readTransactions();
  const transaction = transactions.find((t) => t.id === parseInt(req.params.id));
  if (transaction) {
    res.json(transaction);
  } else {
    res.status(404).json({ message: "Transaction not found" });
  }
});

// Add a new transaction
app.post("/api/transactions", (req, res) => {
  const transactions = readTransactions();
  const newTransaction = {
    id: Date.now(),
    ...req.body
  };
  transactions.push(newTransaction);
  writeTransactions(transactions);
  res.status(201).json(newTransaction);
});

// Update a transaction
app.put("/api/transactions/:id", (req, res) => {
  let transactions = readTransactions();
  const id = parseInt(req.params.id);
  transactions = transactions.map((t) =>
    t.id === id ? { ...t, ...req.body } : t
  );
  writeTransactions(transactions);
  res.json({ message: "Transaction updated successfully" });
});

// Delete a transaction
app.delete("/api/transactions/:id", (req, res) => {
  let transactions = readTransactions();
  transactions = transactions.filter((t) => t.id !== parseInt(req.params.id));
  writeTransactions(transactions);
  res.json({ message: "Transaction deleted successfully" });
});

// Fallback route
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
