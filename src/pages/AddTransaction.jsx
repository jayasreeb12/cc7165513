import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddTransaction({ onAdd }) {
  const [form, setForm] = useState({ category: "", amount: "", note: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.category || !form.amount) {
      alert("Category and Amount are required!");
      return;
    }
    onAdd(form);
    navigate("/");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-4">Add Transaction</h1>
      <form onSubmit={handleSubmit} className="bg-gray-800 text-white p-6 rounded shadow-md max-w-md">
        <label className="block mb-1 font-semibold">Category</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded bg-gray-700 text-white"
        >
          <option value="">-- Select Category --</option>
          <option value="House">House</option>
          <option value="Sales">Sales</option>
          <option value="Investments">Investments</option>
          <option value="Others">Others</option>
        </select>

        <label className="block mb-1 font-semibold">Amount</label>
        <input
          name="amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded bg-gray-700 text-white"
          placeholder="Enter amount"
        />

        <label className="block mb-1 font-semibold">Note (optional)</label>
        <textarea
          name="note"
          value={form.note}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded bg-gray-700 text-white"
          placeholder="Enter note"
        />

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransaction;