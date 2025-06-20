const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    "Category": String,
    "amount": Number,
    
    "note":String,
    "type":String,
   
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);