import TransactionCard from "../components/TransactionCard";

function Dashboard({ transactions }) {
  return (
    <div className="p-4 bg-gray-900 min-h-screen">
      <h1 className="text-white text-3xl font-bold mb-4">Dashboard</h1>
      {transactions.length === 0 ? (
        <p className="text-gray-400">No transactions added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {transactions.map((tx, index) => (
            <TransactionCard key={index} {...tx} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;