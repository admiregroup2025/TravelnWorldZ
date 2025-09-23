import { BusFront, Hotel, Plane, TrainFront } from 'lucide-react'
import React from 'react'

function QuickSection() {
  return (
 <section id="quick-info" className="bg-white border rounded-md shadow-sm p-5 mt-6">
            {/* Quick Information */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Quick Information</h2>
                <p className="text-sm text-gray-700">Year of Establishment</p>
                <p className="font-bold text-base text-gray-900">2011</p>
            </div>
            {/* Highlights from the business */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-4">Highlights from the business</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 w-[70%] md:gap-2 text-center">
                    <div className="flex flex-col gap-4">
                        <Plane className=" text-yellow-500" size={36} />
                        <p className="text-sm text-left font-medium mt-2 text-gray-800">Flight Booking</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <Hotel className=" text-pink-500" size={36} />
                        <p className="text-sm text-left font-medium mt-2 text-gray-800">Hotel Booking</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <BusFront className=" text-blue-500" size={36} />
                        <p className="text-sm text-left font-medium mt-2 text-gray-800">Bus Booking</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <TrainFront className=" text-green-600" size={36} />
                        <p className="text-sm text-left font-medium mt-2 text-gray-800">Railway Booking</p>
                    </div>
                </div>
            </div>

            {/* Booking Services */}
            <div className="mt-6 border-t pt-4">
                <h3 className="text-base font-semibold mb-2">✔ Booking Services</h3>
                <p className="text-sm text-gray-700">
                Flight Booking, Hotel Booking, Bus Booking, Railway Booking{" "}
                <span className="text-blue-600 font-semibold cursor-pointer hover:underline">
                    +2
                </span>
                </p>
            </div>
        </section>
  )
}

export default QuickSection