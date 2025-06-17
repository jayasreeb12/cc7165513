import TransactionCard from "../components/TransactionCard";

function Dashboard({ transactions, deleteTransaction, editTransaction, user }) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {transactions.length > 0 ? (
          transactions.map((tx, index) => (
            <TransactionCard
              key={index}
              index={index}
              {...tx}
              onDelete={deleteTransaction}
              onEdit={editTransaction}
            />
          ))
        ) : (
          <p className="text-gray-400 col-span-full text-center">
            No transactions yet. Click "Add Transaction" to get started!
          </p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;