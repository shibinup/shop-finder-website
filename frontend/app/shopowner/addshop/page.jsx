"use client"
import React, { useEffect, useState } from 'react';
import LocationPicker from '../components/LocationPicker';
import dynamic from "next/dynamic";
import { useRouter } from 'next/navigation'

// made a sample location make corerct with backend 

 export default function AddShop() {
  // State for image uploads (max 3)
  const [images, setImages] = useState([null, null, null]);
  const[shopName,setShopName]= useState("")
  const[email,setEmail] = useState("")
  const[password,setPassword] = useState("")
  const[category,setCategory] =useState("Grocery")
  const[phoneNumber,setPhoneNumber] = useState("")
  const[secondaryPhoneNumber,setSeconsaryPhoneNumber] = useState("")
  const[weblink,setWEblink] = useState("")
  const[description,setDescription] = useState("")

  const router = useRouter()

  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = URL.createObjectURL(file);
      setImages(newImages);
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
  };

  const handleChange = (e)=>{
   const val = e.target.value
   setCategory(val)
  }
  useEffect(()=>{
  console.log("updated is ",category)
  },[category])

  return (
    <div className="min-h-screen bg-[#F4F7FF] py-6 px-4 md:py-10 flex justify-center items-start font-sans text-gray-800">
      <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-xl shadow-blue-900/5 w-full max-w-[1300px] overflow-hidden border border-white">
        
        {/* Header Navigation */}
        <header className="flex justify-between items-center p-6 md:px-10 border-b border-gray-100">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xl">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
            City Finder
          </div>
          
          <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-gray-600">
            <a href="#" className="hover:text-blue-600 transition-colors">Dashboard</a>
            <a href="#" className="hover:text-blue-600 transition-colors flex items-center gap-1.5">
                Analytics 
                <span className="bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">5</span>
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">Messages</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Settings</a>
            <div className="flex items-center gap-3 border-l border-gray-200 pl-6">
                <button className="p-2.5 bg-gray-50 rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                </button>
                <button className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold border-2 border-white shadow-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </button>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-4">
             <button className="p-2 bg-blue-50 text-blue-600 rounded-xl text-sm font-semibold flex items-center gap-2">
                Dashboard
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
             </button>
          </div>
        </header>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50/30 p-6 md:p-10 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-[80px] opacity-20"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-[80px] opacity-20"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3 tracking-tight">Add Your Shop</h1>
                    <p className="text-gray-500 font-medium text-lg">Fill out the details about your shop to get started.</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none px-5 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 flex items-center justify-center gap-2 shadow-sm transition-all">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                        Dashboard
                    </button>
                
                    <button  onClick={()=>router.push("/shopowner/signup")} className="flex-1 md:flex-none px-6 py-3 bg-blue-600 rounded-xl text-white font-semibold hover:bg-blue-700 shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all">
                        Sign Up
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
                    </button>
                
               
                </div>
            </div>
        </div>

        {/* Main Content Form */}
        <div className="p-6 md:p-10 bg-gray-50/30">
          <form className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Basic Information */}
            <div className="lg:col-span-7 space-y-8">
              <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-gray-100/80">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Basic Information</h2>
                  <p className="text-gray-500 mb-8 font-medium">Fill out the details about your shop to get start.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-gray-700">Shop Name</label>
                        <input type="text"   value={shopName} onChange={(e)=>setShopName(e.target.value)}  placeholder="Shop Name" className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none font-medium text-gray-800 placeholder-gray-400" />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-gray-700">Category</label>
                        <div className="relative">
                            <select value={category} onChange={handleChange} className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none appearance-none font-medium text-gray-800">
                                <option  value={"Grocery"} >Grocery</option>
                                <option value={"Clothing"}>Clothing</option>
                                <option  value={"Electronics"} >Electronics</option>
                                <option value={"Restaurant"}>Restaurant</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                            </div>
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-gray-700"> Email</label>
                        <input type="email"   value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder="Should Enter same of loggd email " className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none font-medium text-gray-800 placeholder-gray-400" />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-gray-700">password</label>
                        <input type="password"   value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder="Should same as logged email password" className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none font-medium text-gray-800 placeholder-gray-400" />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-gray-700">Phone Number</label>
                        <input type="tel"   value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}   placeholder="+91" className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none font-medium text-gray-800 placeholder-gray-400" />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <label className="block text-sm font-bold text-gray-700">Phone Number (Secondary)</label>
                        <input type="tel"   value={secondaryPhoneNumber} onChange={(e)=>setSeconsaryPhoneNumber(e.target.value)}   placeholder="+91" className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none font-medium text-gray-800 placeholder-gray-400" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <label className="block text-sm font-bold text-gray-700">Website</label>
                        <input type="url"  value={weblink} onChange={(e)=>setWEblink(e.target.value)}  placeholder="https://" className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none font-medium text-gray-800 placeholder-gray-400" />
                    </div>
                  </div>

                  {/* 3 Images Upload Area */}
                  <div className="mt-8 space-y-3">
                      <label className="block text-sm font-bold text-gray-700">Shop Images (Max 3)</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[0, 1, 2].map((index) => (
                            <div key={index} className="relative group">
                                {images[index] ? (
                                    <div className="h-40 w-full rounded-2xl border-2 border-gray-200 overflow-hidden relative shadow-sm">
                                        <img src={images[index]} alt={`Upload ${index + 1}`} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                        <button 
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-red-500 p-2 rounded-xl shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                    </div>
                                ) : (
                                    <label className="h-40 w-full rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/30 hover:bg-blue-50/80 flex flex-col items-center justify-center cursor-pointer transition-colors text-center p-4 group">
                                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        </div>
                                        <span className="text-sm font-bold text-blue-600">Drag & Drop or Browse</span>
                                        <span className="text-xs font-medium text-gray-500 mt-1">Image {index + 1}</span>
                                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(index, e)} />
                                    </label>
                                )}
                            </div>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500 font-medium pt-1">Add good quality photos, recommended 1000x1000px, max 5MB.</p>
                  </div>

                  <div className="mt-8 space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="block text-sm font-bold text-gray-700">Short Description</label>
                        <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-md">0/300</span>
                      </div>
                      <textarea 
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                        rows="4" 
                        placeholder="Write a short description about your shop..."
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none resize-none font-medium text-gray-800 placeholder-gray-400"
                      ></textarea>
                  </div>

                  <div className="mt-8 flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <div className="flex items-center h-5 mt-0.5">
                          <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-colors cursor-pointer" />
                      </div>
                      <label className="text-sm font-medium text-gray-600 leading-relaxed cursor-pointer">
                          I agree to the <a href="#" className="text-blue-600 font-bold hover:underline">Terms & Conditions</a> / <a href="#" className="text-blue-600 font-bold hover:underline">Privacy Policy</a>
                      </label>
                  </div>
                  
                  <div className="mt-8 hidden lg:block">
                     <button type="button" className="w-full py-4.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-600/20 transition-all text-lg flex items-center justify-center gap-2">
                        Create Shop
                     </button>
                  </div>
              </div>
            </div>

            {/* Right Column: Shop Location & Business Hours */}
            <div className="lg:col-span-5 space-y-8">
                
                {/* Shop Location */}
                <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-gray-100/80">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop Location</h2>
                    
                    <div className="space-y-5">
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700">Address</label>
                            <div className="relative">
                                <input type="text" placeholder="Enter your shop address" className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none pr-12 font-medium text-gray-800 placeholder-gray-400" />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                                    <button type="button" className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-500 transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Map Mockup */}
                        <div className="w-full h-56 bg-gray-100 rounded-2xl border border-gray-200 overflow-hidden relative shadow-inner">
                            {/* Abstract Map Background */}
                            <div className="absolute inset-0 bg-[#e5e3df] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-70"></div>
                            
                            {/* Map Roads (Mock) */}
                            <div className="absolute top-1/4 left-0 w-full h-2 bg-white transform -rotate-12"></div>
                            <div className="absolute top-1/2 left-0 w-full h-3 bg-white transform rotate-6"></div>
                            <div className="absolute top-0 left-1/3 w-2 h-full bg-white transform rotate-12"></div>
                            
                            {/* Map UI Elements */}
                            <div className="absolute right-3 top-3 flex flex-col bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                                <button type="button" className="p-2.5 border-b border-gray-100 hover:bg-gray-50 text-gray-600 transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg></button>
                                <button type="button" className="p-2.5 hover:bg-gray-50 text-gray-600 transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 12H4" /></svg></button>
                            </div>
                            
                            {/* Map Pins */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                                <div className="bg-blue-600 text-white p-2 rounded-full shadow-lg relative z-10">
                                    <svg className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                                </div>
                                <div className="w-3 h-3 bg-blue-600/30 rounded-full animate-ping absolute top-3"></div>
                            </div>

                            {/* Secondary Pins */}
                            <div className="absolute top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-blue-400">
                                <svg className="w-6 h-6 drop-shadow-sm" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                            </div>
                            <div className="absolute bottom-1/3 right-1/3 transform -translate-x-1/2 -translate-y-1/2 text-blue-400">
                                <svg className="w-6 h-6 drop-shadow-sm" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                            </div>
                        </div>
                        
                        <div className="flex items-start gap-3 text-sm font-medium text-blue-900 bg-blue-50/80 p-4 rounded-xl border border-blue-100">
                            <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                            <span>2291 Broadway, New York, NY 10024, USA</span>
                        </div>
                    </div>
                </div>

                {/* Business Hours  are not added*/}

                <LocationPicker/>


                <div className="mt-8 lg:hidden block">
                     <button type="button" className="w-full py-4.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-600/20 transition-all text-lg flex items-center justify-center gap-2">
                        Create Shop
                     </button>
                  </div>

            </div>
          </form>
        </div>
        
        {/* Footer Features Section */}
        <div className="bg-white p-6 md:px-10 md:py-8 border-t border-gray-100 flex flex-wrap gap-4 justify-center md:justify-between items-center text-sm font-bold text-gray-700">
            <div className="flex items-center gap-3 bg-gray-50/80 hover:bg-blue-50/50 transition-colors px-5 py-3 rounded-2xl border border-gray-100 cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                </div>
                Easy Setup
            </div>
            <div className="flex items-center gap-3 bg-gray-50/80 hover:bg-green-50/50 transition-colors px-5 py-3 rounded-2xl border border-gray-100 cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center shadow-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                Verified Badges
            </div>
            <div className="flex items-center gap-3 bg-gray-50/80 hover:bg-purple-50/50 transition-colors px-5 py-3 rounded-2xl border border-gray-100 cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shadow-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
                </div>
                Lead & Insights
            </div>
            <div className="flex items-center gap-3 bg-gray-50/80 hover:bg-orange-50/50 transition-colors px-5 py-3 rounded-2xl border border-gray-100 cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shadow-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                </div>
                24/7 Support
            </div>
        </div>
      </div>
    </div>
  );
};

