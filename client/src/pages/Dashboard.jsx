import TransactionCard from "../components/TransactionCard";

function Dashboard({ transactions, deleteTransaction }) {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;

  return (
    <div className="space-y-6 px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-green-100 p-4 rounded text-green-800 shadow text-center">
          <h2 className="text-lg font-semibold">Total Income</h2>
          <p className="text-2xl font-bold">₹{income.toFixed(2)}</p>
        </div>
        <div className="bg-red-100 p-4 rounded text-red-800 shadow text-center">
          <h2 className="text-lg font-semibold">Total Expenses</h2>
          <p className="text-2xl font-bold">₹{expenses.toFixed(2)}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded text-blue-800 shadow text-center">
          <h2 className="text-lg font-semibold">Remaining Balance</h2>
          <p className="text-2xl font-bold">₹{balance.toFixed(2)}</p>
        </div>
      </div>

      <TransactionCard transactions={transactions} deleteTransaction={deleteTransaction} />
    </div>
  );
}

export default Dashboard;
