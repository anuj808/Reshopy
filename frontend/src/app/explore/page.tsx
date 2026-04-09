"use client";

import { useEffect, useState } from "react";

export default function ExplorePage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://reshopy-backend.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Explore Products 🛍️</h1>

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
  );
}