import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import AddTransaction from "./pages/AddTransaction";
import UserSetup from "./pages/UserSetup";
import bgImage from "./assets/finance.jpg";

// Get backend URL from environment variables
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

if (!VITE_BACKEND_URL) {
  throw new Error("VITE_BACKEND_URL is not defined. Please check your .env file.");
}

function App() {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch(`${VITE_BACKEND_URL}/api/transactions`);
        if (!res.ok) throw new Error("Failed to fetch transactions");
        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        console.error("Fetch error:", err);
        alert("Unable to load transactions");
      }
    };

    if (user) fetchTransactions();
  }, [user]);

  const handleAddTransaction = async (newTx) => {
    try {
      const res = await fetch(`${VITE_BACKEND_URL}/api/transactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTx),
      });

      if (!res.ok) throw new Error("Failed to add transaction");

      const savedTx = await res.json();
      setTransactions((prev) => [...prev, savedTx]);
    } catch (error) {
      console.error("Add error:", error);
      alert("Failed to add transaction");
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      const res = await fetch(`${VITE_BACKEND_URL}/api/transactions/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete transaction");

      setTransactions((prev) => prev.filter((tx) => tx._id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete transaction");
    }
  };

  const handleEditTransaction = async (id, updatedTx) => {
    if (!updatedTx.category || !updatedTx.amount) {
      alert("Category and Amount are required.");
      return;
    }

    try {
      const res = await fetch(`${VITE_BACKEND_URL}/api/transactions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTx),
      });

      if (!res.ok) throw new Error("Failed to edit transaction");

      const updated = await res.json();
      setTransactions((prev) =>
        prev.map((tx) => (tx._id === id ? updated : tx))
      );
    } catch (error) {
      console.error("Edit error:", error);
      alert("Failed to edit transaction");
    }
  };

  if (!user) return <UserSetup setUser={setUser} />;

  return (
    <Router>
      <div
        className="flex min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundColor: "#001f3f",
        }}
      >
        <Sidebar />

        <div className="flex-1 p-4 text-white">
          <div className="bg-white bg-opacity-20 p-3 rounded-md text-right font-semibold text-lg mb-4">
            USER NAME: <span className="font-bold">{user.name}</span> | ID: {user.id}
          </div>

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
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
