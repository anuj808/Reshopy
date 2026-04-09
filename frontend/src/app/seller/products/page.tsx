"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "../../../components/ProtectedRoute";

export default function SellerProducts() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/my-products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <ProtectedRoute allowedRoles={["seller"]}>
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">My Products</h1>

        <div className="grid grid-cols-2 gap-4">
          {products.map((p) => (
            <div key={p._id} className="border p-4 rounded">
              <img src={p.image} className="h-32 w-full object-cover mb-2" />
              <h2>{p.name}</h2>
              <p>₹{p.price}</p>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}