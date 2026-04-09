"use client";

import ProtectedRoute from "../../components/ProtectedRoute";
import Link from "next/link";


export default function SellerDashboard() {
  return (
    <ProtectedRoute>
      <div className="p-6">
        <h1 className="text-2xl font-bold">Seller Dashboard</h1>
        <Link href="/seller/add-product">Add Product</Link>
<Link href="/seller/products">My Products</Link>
      </div>
    </ProtectedRoute>
  );
}