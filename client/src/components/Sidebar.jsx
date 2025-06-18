import { Link, useLocation } from "react-router-dom";
import { FaMoneyBillWave } from "react-icons/fa";

function Sidebar() {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? "bg-blue-200 text-white" : "text-blue-700 hover:text-blue-500";

  return (
    <div className="w-64 bg-white text-black p-6 shadow-md min-h-screen">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-6 text-blue-700">
        <FaMoneyBillWave className="text-yellow-500" /> Finance Manager
      </h2>
      <nav className="flex flex-col gap-4">
        <Link to="/" className={`rounded px-3 py-2 font-black-900 ${isActive("/")}`}>
          Dashboard
        </Link>
        <Link to="/add" className={`rounded px-3 py-2 font-black-900 ${isActive("/add")}`}>
          Add Transaction
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;