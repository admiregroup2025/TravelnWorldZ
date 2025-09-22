import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './MainLayout';
import AdminLayout from './AdminLayout';

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
        <Route index element={<AdminPannel />} />   {/* /admin */}
        {/* <Route path='buy-lead' element={<AdminLeads/>}/> */}
        {/* <Route path="users" element={<AdminUsers />} /> /admin/users */}
        {/* more admin routes here */}
      </Route>
    </Routes>
  );
};

export default App;
