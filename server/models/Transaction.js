const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },  
    amount: { type: Number, required: true },
    note: { type: String },
    type: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);
