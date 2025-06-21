import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function EditTransaction({ transactions, onEdit }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const existingTx = transactions.find((tx) => tx._id === id);
  const [formData, setFormData] = useState({
    category: "",
    amount: "",
    note: "",
    type: ""
  });

  useEffect(() => {
    if (existingTx) {
      setFormData({
        category: existingTx.category,
        amount: existingTx.amount,
        note: existingTx.note,
        type: existingTx.type
      });
    }
  }, [existingTx]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.name === "amount"
        ? parseFloat(e.target.value)
        : e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.category || !formData.amount || !formData.type) {
      alert("All fields except note are required");
      return;
    }

    await onEdit(id, formData);
    navigate("/");
  };

  if (!existingTx) return <p className="text-center text-white">Transaction not found.</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50 text-black">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold text-blue-700 text-center mb-4">Edit Transaction</h2>

        <label className="block mb-1 font-medium">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="">Select Category</option>
          <option value="House Expenses">House Expenses</option>
          <option value="Rent">Rent</option>
          <option value="Office">Office</option>
          <option value="Other">Other</option>
        </select>

        <label className="block mb-1 font-medium">Amount</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />

        <label className="block mb-1 font-medium">Note</label>
        <input
          type="text"
          name="note"
          value={formData.note}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        />

        <label className="block mb-1 font-medium">Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="">Select Type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700">
          Update Transaction
        </button>
      </form>
    </div>
  );
}

export default EditTransaction;
