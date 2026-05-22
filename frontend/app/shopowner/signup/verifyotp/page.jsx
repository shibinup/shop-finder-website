"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function OtpVerifyPage() {
  const router = useRouter();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inputsRef = useRef([]);

  // handle input change
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  // handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      setError("Enter full 6-digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const email = localStorage.getItem("email"); 
      const password = localStorage.getItem("password")
      localStorage.clear()

const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shopowner/signup/verifyotp`, { 
  method: "POST", 
  headers: { 
    "Content-Type": "application/json", 
  }, 
  body: JSON.stringify({ 
    otp: finalOtp, 
    email: email,
    password:password 
  }), 
  credentials: 'include', 
});


      const data = await res.json();
      console.log("data is ",data)

      if (!res.ok) {
        throw new Error(data.message || "OTP verification failed");
        router.push("/shopowner/signup")
      }

      
      router.push("/shopowner/addshop");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 sm:p-8">
        
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Verify OTP
        </h2>

        <p className="text-center text-sm text-gray-500 mb-6">
          Enter the 6-digit code sent to your email
        </p>

        <form onSubmit={handleVerify}>

          {/* OTP Inputs */}
          <div className="flex justify-between gap-2 mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 sm:w-14 sm:h-14 text-center text-lg font-bold border border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
              />
            ))}
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm text-center mb-3">
              {error}
            </p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

        </form>

        {/* resend */}
        <p className="text-center text-sm text-gray-500 mt-5">
          Didn’t receive code?{" "}
          <button className="text-blue-600 font-semibold hover:underline">
            Resend
          </button>
        </p>

      </div>
    </div>
  );
}