"use client"
//import shops from '../../dummydb/shopownersDatas';
import React, { useEffect, useState } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { 
  MapPin, Bell, User, ArrowLeft, Star, Share2, 
  Phone, Globe, Wifi, Leaf, Truck, CreditCard, 
  Clock
} from 'lucide-react';

import { use } from 'react';
import Loading from './components/loading';

//have to make more api and fetching etc

export default  function ShopDetails() {
  
  const [activeTab, setActiveTab] = useState('Overview');

  const[loading,setLoading] = useState(true)

  const[currentShop,setCurrentshop] = useState(null)
  const router = useRouter()
   

 // here dummy fetch function 
useEffect(()=>{

    const fetchShop= async()=>{
        try {
          setLoading(true)
          const res = await fetch(`http://localhost:4000/api/shopowner/getMyshop`, {
      credentials: "include", // 👈 This sends cookies
          });
        const data = await res.json()
        if(data.shop){
          setCurrentshop(data.shop)
        } else{
          router.push("/shopowner/addshop")
          return
        }
        setLoading(false)
        } catch (error) {
          setLoading(false)
          console.log("error si",error)
        }finally{
          setLoading(false)
        }
    }
    fetchShop()
    
},[])

console.log("current shop is ",currentShop)


if(loading) return <Loading/>
if(currentShop===null) return null

  return (
    <div className="min-h-screen bg-[#F8F9FE] font-sans text-slate-900 pb-12">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-4 md:px-8 py-4 bg-[#F8F9FE]">
        <div className="flex items-center gap-2 text-blue-600 font-bold text-xl">
          <MapPin className="w-6 h-6 fill-blue-600 text-white" />
          <span className="text-slate-900">City Finder</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-800">
          <a href="#" className="hover:text-blue-600">Home</a>
          <button onClick={()=>router.push(`/shopowner/editshop`)}><a  className="hover:text-blue-600">Edit Details</a></button>
          <a href="#" className="hover:text-blue-600">Help</a>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <button className="hover:bg-slate-200/50 p-2 rounded-full transition-colors"><Bell className="w-5 h-5" /></button>
          <button className="hover:bg-slate-200/50 p-2 rounded-full transition-colors border-2 border-slate-200"><User className="w-5 h-5" /></button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 md:px-8 mt-2">
        {/* Hero Section */}
        <div className="relative h-[250px] md:h-[300px] w-full rounded-[2rem] overflow-hidden shadow-sm" 
             style={{ backgroundImage: "url('https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent"></div>
          <div className="absolute top-6 left-6 flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="bg-white/20 backdrop-blur-md p-1.5 rounded-full text-white">
                <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="font-medium text-white text-sm drop-shadow-md">{currentShop.address}</span>
          </div>
        </div>

        {/* Header Card (Overlapping Hero) */}
        <div className="px-4 md:px-12 -mt-16 relative z-10">
          <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] pt-6 pb-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center max-w-3xl mx-auto border border-white/50">
            <h1 className="text-[40px] font-bold text-slate-900 mb-2">{currentShop.shopName}</h1>
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500 mb-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i === 4 ? 'text-slate-200 fill-current' : 'fill-current'}`} />
                ))}
              </div>
              <span className="font-bold text-slate-700">4.8</span>
              <span className="text-slate-300">|</span>
              <span className='text-2xl font-bold text-blue-600 '>{currentShop.category}</span>
            </div>

            {/* Tabs */}
            <div className="flex items-center justify-center gap-8 px-4 border-b border-slate-100 overflow-x-auto no-scrollbar">
              {['Overview', 'Reviews', 'Photos', 'Location'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 px-2 text-sm font-semibold transition-all relative whitespace-nowrap ${activeTab === tab ? 'text-slate-900' : 'text-slate-400 hover:text-slate-700'}`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 w-full h-[3px] bg-blue-500 rounded-t-full"></span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="mt-8 flex flex-col lg:flex-row gap-6">
          
          {/* Sidebar */}
          <div className="lg:w-[340px] shrink-0 space-y-6">
            
            {/* Gallery */}
            <div className="bg-white rounded-3xl p-4 shadow-[0_2px_20px_rgb(0,0,0,0.02)] border border-white">
              <div className="rounded-2xl overflow-hidden h-[180px] mb-3">
                <img src={currentShop.images[0].url} alt="Main shop" className="w-full h-full object-cover" />
              </div>



              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl overflow-hidden h-[70px]">
                  {currentShop.images[1] && (
                    <img src={currentShop.images[1].url} alt="Produce" className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="rounded-xl overflow-hidden h-[70px]">
                  {currentShop.images[2] && (
                    <img src={currentShop.images[2].url} alt="Aisle" className="w-full h-full object-cover" />
                  )}
                </div>
              </div>
            </div>


            

            {/* Content Categories */}
            <div className="px-2 flex items-center gap-6 text-sm font-semibold text-slate-500">
               <span className="text-slate-900 border-b-2 border-slate-900 pb-1">Content</span>
               <span>Categories</span>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-3xl p-6 shadow-[0_2px_20px_rgb(0,0,0,0.02)] space-y-5">
              <h3 className="font-bold text-slate-800 text-[17px]">Phone</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                  <Phone className="w-5 h-5 text-slate-400" />
                  <span>{currentShop.phoneNumber}</span>
                </div>
                <button className="bg-[#4285F4] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-600 transition-colors shadow-md shadow-blue-500/20 flex items-center gap-2">
                  Call <ArrowLeft className="w-4 h-4 rotate-[135deg]" />
                </button>
              </div>
              <div className="flex items-center gap-3 text-slate-600 text-sm font-medium mt-2">
                <Globe className="w-5 h-5 text-slate-400" />
                <a href="#" className="hover:text-blue-500 transition-colors">{currentShop.email}</a>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-3xl p-6 shadow-[0_2px_20px_rgb(0,0,0,0.02)]">
              <h3 className="font-bold text-slate-800 text-[17px] mb-4">Amenities</h3>
              <div className="flex flex-wrap gap-2.5">
                <span className="flex items-center gap-2 px-3.5 py-2 bg-[#F0FDF4] text-[#15803D] rounded-xl text-[13px] font-semibold"><MapPin className="w-[14px] h-[14px]" /> Near You</span>
                <span className="flex items-center gap-2 px-3.5 py-2 bg-[#EFF6FF] text-[#1D4ED8] rounded-xl text-[13px] font-semibold"><Wifi className="w-[14px] h-[14px]" /> Free Wi-Fi</span>
                <span className="flex items-center gap-2 px-3.5 py-2 bg-[#F0FDF4] text-[#15803D] rounded-xl text-[13px] font-semibold w-full"><Leaf className="w-[14px] h-[14px]" /> Organic Products</span>
                <span className="flex items-center gap-2 px-3.5 py-2 bg-[#F8FAFC] text-slate-600 rounded-xl text-[13px] font-semibold border border-slate-100"><Truck className="w-[14px] h-[14px]" /> Delivery Available</span>
                <span className="flex items-center gap-2 px-3.5 py-2 bg-[#EEF2FF] text-[#4338CA] rounded-xl text-[13px] font-semibold"><CreditCard className="w-[14px] h-[14px]" /> Contactless Payments</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            
            {/* Description */}
            <div className="bg-white rounded-3xl p-6 shadow-[0_2px_20px_rgb(0,0,0,0.02)]">
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-[17px] font-bold text-slate-800">269 shops in New York, NY <span className="text-blue-500 font-normal text-sm ml-2">240 treats</span></h2>
                <div className="flex gap-2">
                  <button className="p-2 border border-slate-100 rounded-lg text-slate-400 hover:bg-slate-50 transition-colors"><Bell className="w-4 h-4" /></button>
                  <button className="p-2 border border-slate-100 rounded-lg text-slate-400 hover:bg-slate-50 transition-colors"><Share2 className="w-4 h-4" /></button>
                </div>
              </div>
              <p className="text-slate-500 text-[15px] leading-relaxed mb-6">
                {currentShop.description}
              </p>
              <a href={currentShop. webLink}>
               <button   className="bg-[#4285F4] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-600 transition-colors shadow-md shadow-blue-500/20">
                Visit Website
              </button>
              </a>
            </div>

            {/* Operating Hours */}

            {/* Reviews */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_2px_20px_rgb(0,0,0,0.02)]">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-bold text-slate-800 text-[17px] flex items-center gap-2">Reviews <span className="text-[13px] font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">220 reviews</span></h3>
                <button className="flex items-center gap-2 text-blue-500 font-semibold text-sm hover:underline border border-blue-100 bg-blue-50/50 px-4 py-2 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Write a review
                </button>
              </div>

              <div className="flex flex-col md:flex-row gap-10">
                {/* Rating summary */}
                <div className="md:w-[200px]">
                  <div className="text-[56px] font-bold text-slate-800 leading-none mb-2">4.8</div>
                  <div className="flex text-yellow-400 mb-2 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-[18px] h-[18px] ${i === 4 ? 'text-slate-200 fill-current' : 'fill-current'}`} />
                    ))}
                  </div>
                  <div className="text-sm text-slate-500 font-medium">200 reviews</div>
                  
                  {/* Rating bars */}
                  <div className="mt-6 space-y-2.5">
                    {[
                      { stars: 5, pct: 85, count: 170 },
                      { stars: 4, pct: 20, count: 40 },
                      { stars: 3, pct: 5, count: 7 },
                      { stars: 2, pct: 2, count: 2 },
                      { stars: 1, pct: 1, count: 1 },
                    ].map((row) => (
                      <div key={row.stars} className="flex items-center gap-3 text-[13px] font-medium">
                        <div className="w-8 text-slate-400 flex items-center justify-end gap-1"><Star className={`w-3 h-3 ${row.stars >= 4 ? 'fill-yellow-400 text-yellow-400' : 'fill-slate-300 text-slate-300'}`} /> {row.stars}</div>
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${row.pct}%` }}></div>
                        </div>
                        <div className="w-6 text-right text-slate-400">{row.count}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Map snippet */}
                <div className="flex-1 relative rounded-2xl overflow-hidden h-[240px] group border border-slate-100">
                  <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop" alt="Map" className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-80 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(59,130,246,0.5)]">
                       <MapPin className="w-5 h-5 fill-white text-blue-500" />
                     </div>
                  </div>
                  <div className="absolute bottom-4 right-4">
                     <button className="bg-white text-blue-500 px-4 py-2 rounded-full text-sm font-semibold shadow-md flex items-center gap-2">
                       <MapPin className="w-4 h-4" /> Get Directions
                     </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}
