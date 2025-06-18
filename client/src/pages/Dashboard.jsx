import TransactionCard from "../components/TransactionCard";

function Dashboard({ transactions, deleteTransaction, editTransaction }) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expenses;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded text-blue-800 shadow text-center">
          <h2 className="text-lg font-semibold">Income</h2>
          <p className="text-2xl font-bold">₹{income.toFixed(2)}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded text-blue-800 shadow text-center">
          <h2 className="text-lg font-semibold">Expenses</h2>
          <p className="text-2xl font-bold">₹{expenses.toFixed(2)}</p>
        </div>
        <div className="bg-blue-200 p-4 rounded text-blue-900 shadow text-center">
          <h2 className="text-lg font-semibold">Balance</h2>
          <p className="text-2xl font-bold">₹{balance.toFixed(2)}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {transactions.map((tx, index) => (
          <TransactionCard
            key={index}
            index={index}
            {...tx}
            onDelete={deleteTransaction}
            onEdit={editTransaction}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
