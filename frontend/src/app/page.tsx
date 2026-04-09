"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-6 text-center">
      
      <h1 className="text-3xl font-bold mb-3">
        Welcome to Reshopy 🛍️
      </h1>

      <p className="text-gray-500 mb-8">
        Discover handmade products & support small businesses
      </p>

      <div className="flex flex-col gap-4 w-full max-w-xs">

        {/* 🔐 Login */}
        <button
          onClick={() => router.push("/login")}
          className="bg-black text-white py-3 rounded-lg"
        >
          Login / Signup
        </button>

        {/* 🛍️ Become Seller */}
        <button
          onClick={() => router.push("/login")}
          className="border py-3 rounded-lg"
        >
          Become a Seller
        </button>

        {/* 🌍 Explore Products */}
        <button
          onClick={() => router.push("/explore")}
          className="bg-green-500 text-white py-3 rounded-lg"
        >
          Explore Products
        </button>
      </div>
    </div>
  );
}