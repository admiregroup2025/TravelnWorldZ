import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Packages from './pages/Packages';
import Destination from './pages/Destination';
import B2bLogin from './pages/B2bLogin';
import Blogs from './pages/Blogs';
import Testimonials from './pages/Testimonials';
import ContactUs from './pages/ContactUs';
import TrendingDestination from './components/homeComponent/TrendingDestination';
import TrendingDestinationCards from './components/homeComponent/TrendingDestinationCards';
import AgentDetailPage from './pages/AgentDetailPage';

const App = () => {
  return (
    <div>
      <NavBar />
      {/* exploring routes  */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/aboutUs' element={<AboutUs />} />
        <Route path='/packages' element={<Packages />} />
        <Route path='/destination' element={<Destination />} />
        <Route path='/b2blogin' element={<B2bLogin />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/testimonials' element={<Testimonials />} />
        <Route path='/contactUs' element={<ContactUs />} />
        <Route path='/trending' element={<TrendingDestination/>} />
        <Route path='/trending/:destinationId' element={<TrendingDestinationCards />} />
        <Route path='/trending-destinations/:destinationId/:agencyId' element={<AgentDetailPage/>} />
        {/* Add more routes here as needed */}
      </Routes>
      
      <Footer />
    </div>
  );
}

export default App;