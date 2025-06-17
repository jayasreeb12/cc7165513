
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddTransaction from "./pages/AddTransaction";
import Sidebar from "./components/Sidebar";
import UserSetup from "./pages/UserSetup";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const addTransaction = (newTx) => {
    setTransactions((prev) => [...prev, newTx]);
  };

  const deleteTransaction = (index) => {
    setTransactions((prev) => prev.filter((_, i) => i !== index));
  };

  const editTransaction = (index, updatedTx) => {
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

  if (!user) {
    return <UserSetup setUser={setUser} />;
  }

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-900">
        <Sidebar />
        <div className="flex-1 p-6">
          <div className="text-white text-right mb-4">
          USER NAME: <strong>{user.name}</strong>   ID: {user.id}
          </div>
          <Routes>
            <Route
              path="/"
              element={
                <Dashboard
                  transactions={transactions}
                  deleteTransaction={deleteTransaction}
                  editTransaction={editTransaction}
                  user={user}
                />
              }
            />
            <Route
              path="/add"
              element={<AddTransaction onAdd={addTransaction} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
