import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 bg-black text-white p-4 shadow-md min-h-screen">
      <h2 className="text-xl font-bold mb-6">Finance Management</h2>
      <nav className="flex flex-col gap-4">
        <Link to="/" className="hover:text-yellow-400">Dashboard</Link>
        <Link to="/add" className="hover:text-yellow-400">Add Transaction</Link>
      </nav>
    </div>
  );
}

export default Sidebar;
