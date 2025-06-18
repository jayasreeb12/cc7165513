import { useState } from "react";

function AddTransaction({ onAdd }) {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category || !amount) {
      alert("Category and Amount are required.");
      return;
    }
    onAdd({ category, amount: parseFloat(amount), note, type });
    setCategory("");
    setAmount("");
    setNote("");
    setType("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50 text-black">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md border border-blue-200"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
          Add Transaction
        </h2>

        {/* Category */}
        <label className="block mb-1 font-medium">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="">Select Category</option>
          <option value="House Expenses">House Expenses</option>
          <option value="Rent">Rent</option>
          <option value="Office">Office</option>
          <option value="Other">Other</option>
        </select>

        {/* Amount */}
        <label className="block mb-1 font-medium">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          placeholder="e.g. 1000"
        />

        {/* Note */}
        <label className="block mb-1 font-medium">Note</label>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          placeholder="Optional note"
        />

        {/* Type */}
        <label className="block mb-1 font-medium">Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="">Type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-full"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransaction;
