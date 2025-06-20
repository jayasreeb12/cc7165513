import { Link, useLocation } from "react-router-dom";
import { FaMoneyBillWave, FaList, FaPlus, FaChartLine } from "react-icons/fa";

function Sidebar() {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "bg-blue-700 text-white"
      : "text-blue-700 hover:bg-blue-100";

  return (
    <div className="w-64 bg-white text-black p-6 shadow-md min-h-screen">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-6 text-blue-700">
        <FaMoneyBillWave className="text-yellow-500" /> Finance Manager
      </h2>
      <nav className="flex flex-col gap-3 font-semibold">
        <Link to="/" className={`rounded px-4 py-2 flex items-center gap-2 ${isActive("/")}`}>
          <FaChartLine /> Dashboard
        </Link>
        <Link to="/transactions" className={`rounded px-4 py-2 flex items-center gap-2 ${isActive("/transactions")}`}>
          <FaList /> All Transactions
        </Link>
        <Link to="/add" className={`rounded px-4 py-2 flex items-center gap-2 ${isActive("/add")}`}>
          <FaPlus /> Add Transaction
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;
