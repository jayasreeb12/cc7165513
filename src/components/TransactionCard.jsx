import { useState } from "react";

function TransactionCard({ index, category, amount, note, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  // Initialize state with the props, but we'll reset it on edit click
  const [editForm, setEditForm] = useState({
    category: category,
    amount: amount,
    note: note,
  });

  const handleEditClick = () => {
    
    setEditForm({ category, amount, note });
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(index, {
      category: editForm.category,
      amount: parseFloat(editForm.amount) || 0, 
      note: editForm.note,
    });
    setIsEditing(false);
  };

  return (
    <div className="p-4 bg-yellow-900 rounded shadow-md text-white">
      {isEditing ? (
        <div className="flex flex-col gap-2">
          {/* Add labels for better accessibility */}
          <label>Category</label>
          <input
            type="text"
            value={editForm.category}
            onChange={(e) =>
              setEditForm({ ...editForm, category: e.target.value })
            }
            className="border p-1 rounded text-black"
          />
          <label>Amount</label>
          <input
            type="number"
            value={editForm.amount}
            onChange={(e) =>
              setEditForm({ ...editForm, amount: e.target.value })
            }
            className="border p-1 rounded text-black"
          />
          <label>Note</label>
          <input
            type="text"
            value={editForm.note}
            onChange={(e) =>
              setEditForm({ ...editForm, note: e.target.value })
            }
            className="border p-1 rounded text-black"
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p className="font-semibold">
            Category: <span className="font-normal">{category}</span>
          </p>
          <p className="font-semibold">
            Amount: <span className="font-normal">₹{amount}</span>
          </p>
          <p className="font-semibold">
            Note: <span className="font-normal">{note}</span>
          </p>
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleEditClick} // Use the new handler here
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(index)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionCard;