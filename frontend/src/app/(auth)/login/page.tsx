"use client";

import { useState } from "react";
import { auth } from "@/utils/firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { ConfirmationResult } from "firebase/auth";

declare global {
  interface Window {
    recaptchaVerifier: any;
  }
}

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmObj, setConfirmObj] = useState<any>(null);

  const router = useRouter();

  // 🔥 Setup Recaptcha ONCE
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
        }
      );
    }
  };

  // 🔥 Send OTP
  const sendOTP = async () => {
    try {
      setupRecaptcha();

      const appVerifier = window.recaptchaVerifier;

      const confirmation = await signInWithPhoneNumber(
        auth,
        `+91${phone}`,
        appVerifier
      );

      setConfirmObj(confirmation);
      alert("OTP sent");
    } catch (err) {
      console.error("OTP Error:", err);
    }
  };

  // 🔥 Verify OTP
  const verifyOTP = async () => {
    try {
      if (!confirmObj) {
        alert("Please request OTP first");
        return;
      }

      const res = await confirmObj.confirm(otp);
      const firebaseUser = res.user;

      // 🔌 Backend call
      const response = await fetch(
        "http://localhost:5000/api/auth/phone-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: firebaseUser.phoneNumber,
          }),
        }
      );

      const data = await response.json();

      // ✅ Save token
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // 🔁 Redirect
  // 🔁 Redirect based on role
if (data.user.role === "admin") {
  router.push("/admin");
} else if (data.user.role === "seller") {
  router.push("/seller");
} else {
  router.push("/user");
}
    } catch (err) {
      console.error("Invalid OTP:", err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">

        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-gray-100">
          <div className="w-11 h-11 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center mb-5">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Sign in</h2>
          <p className="text-sm text-gray-500">We will send a one-time code to your number</p>
        </div>

        {/* Form */}
        <div className="px-8 py-6 flex flex-col gap-4">

          {/* Phone input */}
          <div>
            <label className="block text-xs font-medium text-gray-400 tracking-widest mb-2 uppercase">
              Mobile Number
            </label>
            <div className="flex border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
              <div className="flex items-center gap-1.5 px-3 border-r border-gray-200 min-w-[68px]">
                <span className="text-base">🇮🇳</span>
                <span className="text-sm text-gray-500 font-medium">+91</span>
              </div>
              <input
                type="text"
                placeholder="98765 43210"
                className="flex-1 bg-transparent px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          {/* Send OTP button */}
          <button
            onClick={sendOTP}
            className="w-full bg-gray-900 hover:bg-gray-700 active:scale-[0.98] text-white text-sm font-medium py-2.5 rounded-lg transition-all duration-150"
          >
            Send OTP
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-1">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400">enter code</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* OTP input */}
          <div>
            <label className="block text-xs font-medium text-gray-400 tracking-widest mb-2 uppercase">
              One-Time Password
            </label>
            <input
              type="text"
              placeholder="· · · · · ·"
              className="w-full border border-gray-200 rounded-lg bg-gray-50 px-3 py-2.5 text-lg tracking-[0.3em] text-center text-gray-900 placeholder-gray-300 outline-none focus:border-gray-400 transition-colors"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>

          {/* Verify OTP button */}
          <button
            onClick={verifyOTP}
            className="w-full bg-green-50 hover:bg-green-100 active:scale-[0.98] text-green-700 border border-green-200 text-sm font-medium py-2.5 rounded-lg transition-all duration-150"
          >
            Verify &amp; continue →
          </button>

          {/* Footer */}
          <p className="text-xs text-gray-400 text-center leading-relaxed">
            By continuing, you agree to our{" "}
            <span className="text-gray-500 underline cursor-pointer">Terms</span>{" "}
            and{" "}
            <span className="text-gray-500 underline cursor-pointer">Privacy Policy</span>
          </p>
        </div>

        <div id="recaptcha-container" />
      </div>
    </div>
  );
}