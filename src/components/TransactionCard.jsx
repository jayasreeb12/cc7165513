import { useState } from "react";

function TransactionCard({ index, category, amount, note, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    category,
    amount,
    note,
  });

  const handleSave = () => {
    onEdit(index, {
      category: editForm.category,
      amount: parseFloat(editForm.amount),
      note: editForm.note,
    });
    setIsEditing(false);
  };

  return (
    <div className="p-4 bg-yellow-900 rounded shadow-md">
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={editForm.category}
            onChange={(e) =>
              setEditForm({ ...editForm, category: e.target.value })
            }
            className="border p-1 rounded"
          />
          <input
            type="number"
            value={editForm.amount}
            onChange={(e) =>
              setEditForm({ ...editForm, amount: e.target.value })
            }
            className="border p-1 rounded"
          />
          <input
            type="text"
            value={editForm.note}
            onChange={(e) =>
              setEditForm({ ...editForm, note: e.target.value })
            }
            className="border p-1 rounded"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-1 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 text-white px-4 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p>Category: {category}</p>
          <p>Amount: ₹{amount}</p>
          <p>Note: {note}</p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-4 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(index)}
              className="bg-red-600 text-white px-4 py-1 rounded"
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
