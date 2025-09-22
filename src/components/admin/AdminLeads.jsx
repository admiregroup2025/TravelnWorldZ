import react from "react"
import data from './LeadsData.js'

export default function AdminLeads({data}){
    return<>
    <div className="flex flex-row items-stretch bg-white shadow-sm border border-indigo-200 rounded-lg px-3 py-2 w-full max-w-2xl hover:shadow-md cursor-pointer">
      {/* Left Section */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
          <span>{data.timeAgo}</span>
          <span className="text-blue-700 font-medium underline cursor-pointer">{data.destination}</span>
        </div>
        <div className="flex items-center gap-3 text-xs mt-1">
          <span className="flex items-center gap-1">
            <svg width="14" height="14" fill="none"><circle cx="7" cy="7" r="7" fill="#bbb"/></svg>
            <span className="font-semibold text-gray-700">From:</span>
            <span className="font-semibold text-gray-700">{data.from}</span>
          </span>
          <span className="flex items-center gap-1"><svg width="14" height="14" fill="none"><rect width="14" height="14" fill="#bbb"/></svg>NA</span>
        </div>
        <div className="flex items-center gap-3 text-xs mt-2">
          <span className="flex items-center gap-1"><svg width="14" height="14" fill="none"><circle cx="7" cy="7" r="7" fill="#bbb"/></svg>NA</span>
          <span className="flex items-center gap-1"><svg width="14" height="14" fill="none"><circle cx="7" cy="7" r="7" fill="#bbb"/></svg>NA</span>
        </div>
        <div className="flex items-center gap-3 text-xs mt-2">
          <span className="flex items-center gap-1">Pax: ¥({data.pax.adults}) + (0) Ⓜ(0)</span>
          <span className="flex items-center gap-1"><svg width="14" height="14" fill="none"><circle cx="7" cy="7" r="7" fill="#bbb"/></svg>NA</span>
        </div>
        <div className="flex items-center gap-2 mt-3 text-xs">
          <span>Quality:</span>
          <span className="h-2 w-20 bg-gray-300 rounded-md relative">
            <span className="absolute h-2 bg-green-600 rounded-md" style={{ width: "30px" }}></span>
          </span>
        </div>
        <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
          <span>Source: <span className="font-semibold text-black">{data.source}</span></span>
          <span>Sold: <span className="font-semibold text-black">{data.times_sold} Time</span></span>
        </div>
      </div>
      {/* Right Section */}
      <div className="flex flex-col justify-between items-end pl-3 min-w-[160px]">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-700 mb-2">
            <svg width="14" height="14" fill="none"><rect width="14" height="14" fill="#bbb"/></svg>
            <span>{data.dates.start} - {data.dates.end} | {data.dates.nights_days}</span>
          </div>
          <div className="text-base font-bold text-gray-800 mb-1">₹ {data.price.toLocaleString()}</div>
        </div>
        <div>
          <a href="#" className="text-blue-700 text-sm font-semibold block">{data.seller.name}</a>
          <span className="text-xs text-gray-500 block mb-2">Since: {data.seller.since}</span>
          <div className="flex items-center gap-2 mb-2 mt-1">
            <span className="cursor-pointer text-lg">📞</span>
            <span className="cursor-pointer text-lg">🟢</span>
          </div>
          <button className="bg-violet-600 text-white px-4 py-1 rounded font-medium text-sm">Buy Now</button>
        </div>
      </div>
    </div>
    </>
}