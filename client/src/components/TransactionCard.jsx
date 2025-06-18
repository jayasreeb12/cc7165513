import { useState } from "react";

function TransactionCard({ index, category, amount, note, type, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ category, amount, note, type });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(index, {
      category: editForm.category,
      amount: parseFloat(editForm.amount),
      note: editForm.note,
      type: editForm.type,
    });
    setIsEditing(false);
  };

  return (
    <div className="p-4 rounded shadow-md bg-white text-black">
      {isEditing ? (
        <div className="flex flex-col gap-2">
          {/* Category Select Dropdown */}
          <select
            value={editForm.category}
            onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
            className="border p-1 rounded"
          >
            <option value="House Expenses">House Expenses</option>
            <option value="Rent">Rent</option>
            <option value="Office">Office</option>
            <option value="Other">Other</option>
          </select>

          {/* Amount Input */}
          <input
            type="number"
            value={editForm.amount}
            onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })}
            className="border p-1 rounded"
          />

          {/* Note Input */}
          <input
            type="text"
            value={editForm.note}
            onChange={(e) => setEditForm({ ...editForm, note: e.target.value })}
            className="border p-1 rounded"
          />

          {/* Type Select Dropdown */}
          <select
            value={editForm.type}
            onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
            className="border p-1 rounded"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button onClick={handleSave} className="bg-blue-600 text-white px-3 py-1 rounded">
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-3 py-1 rounded">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p><strong>Category:</strong> {category}</p>
          <p><strong>Amount:</strong> ₹{amount}</p>
          <p><strong>Note:</strong> {note}</p>
          <p><strong>Type:</strong> {type}</p>
          <div className="flex gap-2 mt-2">
            <button onClick={handleEditClick} className="bg-blue-600 text-white px-3 py-1 rounded">
              Edit
            </button>
            <button onClick={() => onDelete(index)} className="bg-red-600 text-white px-3 py-1 rounded">
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionCard;
