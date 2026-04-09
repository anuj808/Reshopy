"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function AdminDashboard() {
  const [products, setProducts] = useState<any[]>([]);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const approve = async (id: string) => {
    await fetch(`http://localhost:5000/api/admin/approve/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Approved ✅");
    location.reload();
  };

  const reject = async (id: string) => {
    await fetch(`http://localhost:5000/api/admin/reject/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Rejected ❌");
    location.reload();
  };

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">Admin Panel</h1>

        <div className="grid grid-cols-2 gap-4">
          {products.map((p) => (
            <div key={p._id} className="border p-4 rounded">
              <img src={p.image} className="h-32 w-full object-cover mb-2" />
              <h2>{p.name}</h2>
              <p>₹{p.price}</p>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => approve(p._id)}
                  className="bg-green-500 text-white px-2 py-1"
                >
                  Approve
                </button>

                <button
                  onClick={() => reject(p._id)}
                  className="bg-red-500 text-white px-2 py-1"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}