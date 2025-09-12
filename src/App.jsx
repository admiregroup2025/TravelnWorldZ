import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import AboutUs from './pages/AboutUs.jsx';
import Packages from './pages/Packages.jsx';
import Destination from './pages/Destination.jsx';
import B2BLogin from './pages/B2BLogin.jsx';
import Blogs from './pages/Blogs.jsx';
import Testimonials from './pages/Testimonials.jsx';
import ContactUs from './pages/ContactUs.jsx';
import TrendingDestination from './components/homeComponent/TrendingDestination.jsx';
import TrendingDestinationCards from './components/homeComponent/TrendingDestinationCards.jsx';
import AgentDetailPage from './pages/AgentDetailPage.jsx';

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
        <Route path='/b2blogin' element={<B2BLogin />} />
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