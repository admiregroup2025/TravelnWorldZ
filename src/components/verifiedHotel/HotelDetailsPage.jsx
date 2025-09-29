import React from 'react'
import { useParams } from "react-router-dom";
import hotels from '../../data/hotels'
import HotelHeader from '../HotelDetailsPage/HotelHeader';

const HotelDetailsPage = () => {
    const { id } = useParams();
    const selectedHotel = hotels.find((hotel) => hotel.id === id);
  return (
    <div>
      <HotelHeader hotel={selectedHotel} />
    </div>
  )
}

export default HotelDetailsPage
