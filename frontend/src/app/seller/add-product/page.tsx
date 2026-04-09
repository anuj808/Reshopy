"use client";

import { useState } from "react";
import ProtectedRoute from "../../../components/ProtectedRoute";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
    
  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        price,
        image,
      }),
    });

    const data = await res.json();
    console.log(data);

    alert("Product added ✅");
  };

  return (
    <ProtectedRoute allowedRoles={["seller"]}>
      <div className="p-6 max-w-md mx-auto">
        <h1 className="text-xl font-bold mb-4">Add Product</h1>

        <input
          placeholder="Product Name"
          className="w-full border p-2 mb-3"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Price"
          className="w-full border p-2 mb-3"
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          placeholder="Image URL"
          className="w-full border p-2 mb-3"
          onChange={(e) => setImage(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-black text-white p-2"
        >
          Add Product
        </button>
      </div>
    </ProtectedRoute>
  );
}