import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import AddTransaction from "./pages/AddTransaction";
import UserSetup from "./pages/UserSetup";
import bgImage from "./assets/finance.jpg";

function App() {
  // User state (retrieved from localStorage)
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  // Transaction list state
  const [transactions, setTransactions] = useState([]);

  // Add a new transaction
  const handleAddTransaction = (newTx) => {
    setTransactions((prev) => [...prev, newTx]);
  };

  // Delete transaction by index
  const handleDeleteTransaction = (index) => {
    setTransactions((prev) => prev.filter((_, i) => i !== index));
  };

  // Edit an existing transaction
  const handleEditTransaction = (index, updatedTx) => {
    if (!updatedTx.category || !updatedTx.amount) {
      alert("Category and Amount are required to edit the transaction.");
      return;
    }
    setTransactions((prev) => {
      const updated = [...prev];
      updated[index] = updatedTx;
      return updated;
    });
  };

  // If no user is set, show the user setup page first
  if (!user) return <UserSetup setUser={setUser} />;

  return (
    <Router>
      <div
        className="flex min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* Sidebar */}
        <Sidebar />

        {/* Main content area */}
        <div className="flex-1 p-4 text-white">
          {/* Display username and ID */}
          <div className="text-right font-semibold text-lg mb-2">
            USER NAME: <span className="font-bold">{user.name}</span> | ID: {user.id}
          </div>

          {/* Routes */}
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  transactions={transactions}
                  deleteTransaction={handleDeleteTransaction}
                  editTransaction={handleEditTransaction}
                  user={user}
                />
              }
            />
            <Route
              path="/add"
              element={<AddTransaction onAdd={handleAddTransaction} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
