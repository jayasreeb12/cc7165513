import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function TransactionCard() {
  const [transactions, setTransactions] = useState([]);

  // Fetch all transactions from MongoDB backend
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/transactions`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch transactions");
        return res.json();
      })
      .then((data) => {
        setTransactions(data);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
        alert("Failed to fetch transactions");
      });
  }, []);

  // Delete transaction from MongoDB
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this transaction?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/transactions/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete transaction");

      // Update UI
      setTransactions(transactions.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete transaction");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">All Transactions</h1>

      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-100 text-blue-700">
              <tr>
                <th className="py-2 px-4 text-left">Category</th>
                <th className="py-2 px-4 text-left">Amount</th>
                <th className="py-2 px-4 text-left">Note</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t._id} className="border-t">
                  <td className="py-2 px-4">{t.category}</td>
                  <td className="py-2 px-4">₹ {t.amount}</td>
                  <td className="py-2 px-4">{t.note}</td>
                  <td className="py-2 px-4 flex gap-2">
                    <Link
                      to={`/edit/${t._id}`}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(t._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TransactionCard;
