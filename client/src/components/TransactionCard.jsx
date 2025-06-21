import { Link } from "react-router-dom";

function TransactionCard({ transactions, deleteTransaction }) {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-blue-300 mb-6">All Transactions</h1>

      {transactions.length === 0 ? (
        <p className="text-center text-white-600">No transactions found.</p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full bg-white divide-y divide-gray-200">
            <thead className="bg-blue-100">
              <tr>
                <th className="py-3 px-5 text-left font-semibold text-blue-800">Category</th>
                <th className="py-3 px-5 text-left font-semibold text-blue-800">Type</th>
                <th className="py-3 px-5 text-left font-semibold text-blue-800">Amount</th>
                <th className="py-3 px-5 text-left font-semibold text-blue-800">Note</th>
                <th className="py-3 px-5 text-left font-semibold text-blue-800">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((t) => (
                <tr key={t._id} className="hover:bg-gray-50 transition-all">
                  <td className={`py-3 px-5  font-medium  ${t.type === "income" ? "text-green-600" : "text-red-500"}`}>
                    {t.category}
                  </td>
                  <td className={`py-3 px-5 capitalize font-medium ${t.type === "income" ? "text-green-700" : "text-red-600"}`}>
                    {t.type}
                  </td>
                  <td className={`py-3 px-5 font-semibold ${t.type === "income" ? "text-green-600" : "text-red-500"}`}>
                    ₹ {t.amount}
                  </td>
                  <td className={`py-3 px-5 font-semibold ${t.type === "income" ? "text-green-600" : "text-red-500"}`}>
                    {t.note}</td>
                  <td className="py-3 px-5 flex gap-2">
                    <Link
                      to={`/edit/${t._id}`}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1 rounded-md transition"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteTransaction(t._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md transition"
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
