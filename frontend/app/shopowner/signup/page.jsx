"use client"
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { MapPin, ArrowLeft, Store, TrendingUp, Activity, Eye, EyeOff, Menu, User, User as UserIcon } from 'lucide-react';

//1.have to make correct signup function
//2.if needed add google signup now have only email signup

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  const[name,setName] = useState("")
  const [email,setEmail] = useState("")
  const[password,setPassword] = useState("")

  const router = useRouter()


  //making dummy signup function from frontend
   const handleSignup = async (e) => {
  e.preventDefault();


  try {
    localStorage.setItem("email",email)
    localStorage.setItem("password",password)
    const res = await fetch("http://localhost:4000/api/shopowner/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Signup failed");
    }

    
    // redirect after success
    router.push("/shopowner/signup/verifyotp");

  } catch (err) {
    console.log("error message is ",err.message)
  } 
};
  

  return (
    <div className="min-h-screen bg-gray-50 lg:bg-[#f4f7fe] flex flex-col lg:items-center lg:justify-center lg:p-8 font-sans">
      
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-gray-100 w-full">
        <Menu className="w-6 h-6 text-gray-600" />
        <div className="flex items-center gap-2 text-xl font-bold text-gray-900">
          <MapPin className="text-blue-600 w-6 h-6" /> City Finder
        </div>
        <User className="w-6 h-6 text-gray-600" />
      </div>

      <div className="bg-white lg:rounded-3xl lg:shadow-2xl lg:shadow-blue-900/5 w-full max-w-[1200px] overflow-hidden flex flex-col lg:flex-row">
        
        {/* Left Section */}
        <div className="lg:w-1/2 p-6 lg:p-12 bg-gradient-to-b from-[#e0ebff] to-[#c4dafe] lg:rounded-2xl lg:m-4 relative overflow-hidden flex flex-col pb-32 lg:pb-48">
          
          {/* Desktop Header Logo */}
          <div className="hidden lg:flex items-center justify-between mb-16 relative z-10">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-gray-900">
              <MapPin className="text-blue-600 w-6 h-6" /> City Finder
            </Link>
            <div className="flex items-center gap-8">
              <Link href="#" className="text-gray-600 hover:text-gray-900 font-semibold text-sm transition-colors">Home</Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900 font-semibold text-sm transition-colors">Explore Cities</Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900 font-semibold text-sm transition-colors">Help</Link>
              <Link href="#" className="flex items-center gap-2 text-blue-600 border border-blue-200 px-4 py-2 rounded-full font-semibold text-sm hover:bg-blue-50 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Main Site
              </Link>
            </div>
          </div>

          <div className="relative z-10">
            <span className="bg-blue-200 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold w-fit mb-6 inline-block">
              For Shop Owners
            </span>
            
            <h1 className="text-3xl lg:text-[40px] font-extrabold text-gray-900 leading-[1.15] mb-4">
              Grow Your Business<br />
              <span className="text-blue-600">with City Finder</span>
            </h1>
            
            <p className="text-gray-600 text-base lg:text-lg mb-10 max-w-[400px]">
              Add your shop, reach more customers, and grow your business.
            </p>

            <div className="flex flex-col gap-7">
              <div className="flex items-start gap-4">
                <div className="bg-white p-3.5 rounded-xl shadow-sm text-blue-600 shrink-0">
                  <Store className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Add & Manage Shop</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">Create, update and manage your shop details anytime.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white p-3.5 rounded-xl shadow-sm text-blue-600 shrink-0">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Reach More Customers</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">Get discovered by people searching in your city.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white p-3.5 rounded-xl shadow-sm text-blue-600 shrink-0">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Track Performance</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">View shop insights and customer engagement.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative City/Shop SVG at bottom */}
          <div className="absolute bottom-0 left-0 w-full pointer-events-none z-0">
            <svg viewBox="0 0 500 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto transform translate-y-1 opacity-90">
              <rect x="40" y="80" width="50" height="120" rx="4" fill="#93C5FD" opacity="0.6"/>
              <rect x="110" y="50" width="60" height="150" rx="4" fill="#BFDBFE" opacity="0.6"/>
              <rect x="340" y="70" width="55" height="130" rx="4" fill="#93C5FD" opacity="0.6"/>
              <rect x="410" y="100" width="45" height="100" rx="4" fill="#BFDBFE" opacity="0.6"/>
              
              <rect x="60" y="100" width="10" height="15" fill="#EFF6FF" opacity="0.5"/>
              <rect x="60" y="130" width="10" height="15" fill="#EFF6FF" opacity="0.5"/>
              <rect x="125" y="70" width="12" height="15" fill="#EFF6FF" opacity="0.5"/>
              <rect x="145" y="70" width="12" height="15" fill="#EFF6FF" opacity="0.5"/>
              <rect x="125" y="100" width="12" height="15" fill="#EFF6FF" opacity="0.5"/>
              <rect x="145" y="100" width="12" height="15" fill="#EFF6FF" opacity="0.5"/>
              
              <path d="M180 110 L240 70 L300 110 V200 H180 V110Z" fill="#3B82F6"/>
              
              <rect x="195" y="130" width="30" height="40" rx="2" fill="#DBEAFE"/>
              <rect x="255" y="130" width="30" height="40" rx="2" fill="#DBEAFE"/>
              
              <path d="M170 110 Q185 130 200 110 Q215 130 230 110 Q245 130 260 110 Q275 130 290 110 Q305 130 310 110 L240 60 Z" fill="#1D4ED8"/>
              
              <rect x="210" y="85" width="60" height="18" rx="3" fill="#EFF6FF"/>
              <text x="240" y="98" fontSize="10" fontFamily="sans-serif" fontWeight="900" fill="#1E3A8A" textAnchor="middle">SHOP</text>
              
              <rect x="0" y="190" width="500" height="10" fill="#2563EB"/>
            </svg>
          </div>
        </div>

        {/* Right Section (Form) */}
        <div className="lg:w-1/2 flex flex-col items-center justify-center p-6 lg:p-16">
          <div className="w-full max-w-[400px]">
            
            {/* Tabs */}
            <div className="flex border-b-2 border-gray-100 mb-8 w-full">
              <Link href="/shopowner/login" className="flex-1 text-center py-3.5 font-semibold text-gray-500 hover:text-gray-800 transition-colors">
                Login
              </Link>
              <Link href="/shopowner/signup" className="flex-1 text-center py-3.5 font-bold text-blue-600 border-b-2 border-blue-600 -mb-[2px]">
                Sign Up
              </Link>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-[28px] font-bold text-gray-900 mb-2">Create an Account</h2>
              <p className="text-gray-500 text-sm">Join City Finder and grow your business</p>
            </div>

            <form onSubmit={handleSignup}>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Enter your full name" 
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all text-sm font-medium text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input 
                    type="email" 
                    placeholder="Enter email " 
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all text-sm font-medium text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Create a password" 
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    className="w-full pl-11 pr-11 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all text-sm font-medium text-gray-900 placeholder-gray-400"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-colors mb-8 shadow-[0_4px_14px_0_rgba(37,99,235,0.39)]"
              >
                Sign Up
              </button>

              <div className="relative flex items-center justify-center mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative bg-white px-4 text-xs text-gray-400 font-semibold tracking-wide">
                  or continue with
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-4 mb-8">
                <button type="button" className="w-full lg:flex-1 flex items-center justify-center gap-2 border border-gray-200 bg-white py-3 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span className="lg:hidden">Continue with </span>Google
                </button>
              </div>

              <p className="text-center text-sm text-gray-600 font-medium">
                Already have an account? <Link href="/shopowner/login" className="font-bold text-blue-600 hover:underline">Login</Link>
              </p>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
