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
    <div className="flex items-center justify-center min-h-screen bg-blue-50 text-black">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md max-w-sm w-full border border-blue-200"
      >
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">Enter User Details</h1>
        <label className="block mb-1 font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          placeholder="Enter your name"
        />
        <label className="block mb-1 font-medium">ID</label>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          placeholder="Enter your ID"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default UserSetup;
