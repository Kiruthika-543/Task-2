import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", role: "" });

  const fetchEmployees = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:5000/api/employees", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setEmployees(res.data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await axios.post("http://localhost:5000/api/employees", form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setForm({ name: "", email: "", role: "" });
    fetchEmployees();
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:5000/api/employees/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchEmployees();
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Employee Dashboard</h2>
      <form onSubmit={handleAdd} className="flex gap-2 mb-4">
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border p-2" />
        <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="border p-2" />
        <input placeholder="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="border p-2" />
        <button type="submit" className="bg-green-500 text-white px-4 py-2">Add</button>
      </form>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp._id}>
              <td className="border p-2">{emp.name}</td>
              <td className="border p-2">{emp.email}</td>
              <td className="border p-2">{emp.role}</td>
              <td className="border p-2">
                <button onClick={() => handleDelete(emp._id)} className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;