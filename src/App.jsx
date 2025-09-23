import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './MainLayout';
import AdminLayout from './components/admin/AdminLayout';

import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Packages from './pages/Packages';
import Destination from './pages/Destination';
import B2BLogin from './pages/B2BLogin';
import Blogs from './pages/Blogs';
import Testimonials from './pages/Testimonials';
import ContactUs from './pages/ContactUs';
import TrendingDestination from './components/homeComponent/TrendingDestination';
import TrendingDestinationCards from './components/homeComponent/TrendingDestinationCards';
import AgentDetailPage from './pages/AgentDetailPage';
import BlogDetails from './pages/BlogDetails';
import EnquiryForm from './forms/EnquiryForm';
import InternationalDestination from './pages/InternationalDestination';

// admin pages
// import AdminDashboard from './pages/admin/AdminDashboard';
// import AdminUsers from './pages/admin/AdminUsers';
import AdminPannel from './components/admin/AdminPannel';
import MyLeads from './components/admin/MyLeads/MyLeads';
import Profile from './components/admin/MyAccount/Profile';
import ResetPassword from './components/admin/MyAccount/ResetPassword';
import MyItineraries from './components/admin/MyItineraries/MyItineraries';
import ItineraryForm from './components/admin/MyItineraries/ItineraryForm';
import ItineraryDetail from './components/admin/MyItineraries/ItineraryDetail';

const App = () => {
  return (
    <Routes>
      {/* Public routes with Navbar + Footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/destination" element={<Destination />} />
        <Route path="/b2blogin" element={<B2BLogin />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/trending" element={<TrendingDestination />} />
        <Route path="/trending/:destinationId" element={<TrendingDestinationCards />} />
        <Route path="/trending-destinations/:destinationId/:agencyId" element={<AgentDetailPage />} />
        <Route path="/enquiry-form" element={<EnquiryForm />} />
        <Route path="/international" element={<InternationalDestination />} />
      </Route>

      {/* Admin routes without Navbar + Footer */}
     <Route path="/admin" element={<AdminLayout />}>
  <Route index element={<AdminPannel />} />
  <Route path="my-leads" element={<MyLeads />} />
  <Route path="profile" element={<Profile />} />
  <Route path="reset-password" element={<ResetPassword />} />
  <Route path="Manage-Itianary" element={<MyItineraries />} />
  <Route path="Create-Itinary" element={<ItineraryForm />} />
  <Route path="destinations/:slug" element={<ItineraryDetail />} />
</Route>

    </Routes>
  );
};

export default App;
