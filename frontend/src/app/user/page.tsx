"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function UserDashboard() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://reshopy-backend.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <ProtectedRoute>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Explore Products 🛍️</h1>

        <input
          type="text"
          placeholder="Search handmade products..."
          className="w-full border p-2 mb-4 rounded"
        />

        <div className="grid grid-cols-2 gap-4">
          {products.map((p) => (
            <div key={p._id} className="border p-4 rounded">
              <img src={p.image} alt="" className="h-32 w-full object-cover mb-2" />
              <h2 className="font-semibold">{p.name}</h2>
              <p>₹{p.price}</p>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}