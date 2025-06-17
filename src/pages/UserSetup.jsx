import { useState } from "react";

function UserSetup({ setUser }) {
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !id) {
      alert("Both name and ID are required.");
      return;
    }
    setUser({ name, id });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-md max-w-sm w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Enter User Details</h1>
        <label className="block mb-2 font-semibold">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 border rounded bg-gray-700 text-white"
          placeholder="Enter your name"
        />

        <label className="block mb-2 font-semibold">ID</label>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="w-full p-2 mb-4 border rounded bg-gray-700 text-white"
          placeholder="Enter your ID"
        />

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default UserSetup;
