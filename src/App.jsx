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
import BlogDetails from './pages/BlogDetails.jsx';
import EnquiryForm from './forms/EnquiryForm.jsx';
import GetAQuote from './components/GetAQuote.jsx';
import TranspotersLists from './components/homeComponent/TranspotersLists.jsx';
import TrendingDestinationLists from './components/homeComponent/TrendingDestinationLists.jsx';
// import InternationalDestination from './pages/InternationalDestination.jsx';
import VerifiedTransportDetails from './components/VerifiedTransportDetails.jsx';
import CustomerTourPackages from './components/verifiedTransportDetails/CustomerTourPackages.jsx';
import CustomerVerifiedReview from './components/verifiedTransportDetails/CustomerVerifiedReview.jsx';
import InternationalDestinationsList from './pages/InternationalDestinationsList.jsx';
import DomesticDestinationsList from './pages/DomesticDestinationsList.jsx';
import DomesticItinerary from './components/topMostTourPackages/DomesticItinerary.jsx';
import InternationalItinerary from './components/topMostTourPackages/InternationalItinerary.jsx';
import InternationalItineraryDetailPage from './components/topMostTourPackages/InternationalItineraryDetailPage.jsx';
import DomesticItineraryDetailPage from './components/topMostTourPackages/DomesticItineraryDetailPage.jsx';

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
       
        <Route path='/blogs/:id' element={<BlogDetails />} />
        <Route path='/testimonials' element={<Testimonials />} />
        <Route path='/contactUs' element={<ContactUs />} />
        <Route path='/trending' element={<TrendingDestination/>} />
        <Route path='/trending/:destinationId' element={<TrendingDestinationCards />} />
        <Route path='/trending-destinations/:destinationId/:agencyId' element={<AgentDetailPage/>} />
        <Route path='/nawlesh' element={<EnquiryForm/>} />
        <Route path='/get-a-quote/:destinationId/:agencyId' element={<GetAQuote />} />
        <Route path='/verified-transporters-list' element={<TranspotersLists />} />
        <Route path='/verified-transport-details/:id' element={<VerifiedTransportDetails />} />
        <Route path="/verified-transport-details/:id/packages" element={<CustomerTourPackages />} />
        <Route path="/verified-transport-details/:id/reviews" element={<CustomerVerifiedReview />} />
        <Route path='/trending-destination-list' element={<TrendingDestinationLists />} />
        {/* <Route path='/international' element={<InternationalDestination />} /> */}
        <Route path='/international' element={<InternationalDestinationsList />} />
        <Route path='/international-itinerary/:destinationId' element={<InternationalItinerary />} />
        <Route path='/international-itinerary-detail/:destinationId/:itineraryId' element={<InternationalItineraryDetailPage />} />
        <Route path='/domestic' element={<DomesticDestinationsList />} />
        <Route path='/domestic-itinerary/:destinationId' element={<DomesticItinerary />} />
        <Route path='/domestic-itinerary/:destinationId/:itineraryId' element={<DomesticItineraryDetailPage />} />
        
        {/* Add more routes here as needed */}
      </Routes>
      
      <Footer />
    </div>
  );
}

export default App;