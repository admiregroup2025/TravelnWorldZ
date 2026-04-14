import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './MainLayout';
import AdminLayout from './components/admin/AdminLayout';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import FreeAgents from './pages/FreeAgents.jsx';
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
import GetAQuote from './components/GetAQuote.jsx';
import TranspotersLists from './components/homeComponent/TranspotersLists.jsx';
import TrendingDestinationLists from './components/homeComponent/TrendingDestinationLists.jsx';
import VerifiedTransportDetails from './components/VerifiedTransportDetails.jsx';
import CustomerTourPackages from './components/verifiedTransportDetails/CustomerTourPackages.jsx';
import CustomerVerifiedReview from './components/verifiedTransportDetails/CustomerVerifiedReview.jsx';
import InternationalDestinationsList from './pages/InternationalDestinationsList.jsx';
import DomesticDestinationsList from './pages/DomesticDestinationsList.jsx';
import DomesticItinerary from './components/topMostTourPackages/DomesticItinerary.jsx';
import InternationalItinerary from './components/topMostTourPackages/InternationalItinerary.jsx';
import InternationalItineraryDetailPage from './components/topMostTourPackages/InternationalItineraryDetailPage.jsx';
import DomesticItineraryDetailPage from './components/topMostTourPackages/DomesticItineraryDetailPage.jsx';
import TourPGetAQuote from './components/topMostTourPackages/tourPGetAQuote.jsx';
import TransporterBlogPage from './components/verifiedTransportDetails/TransporterBlogPage.jsx';
import TransporterBlogDetail from './components/verifiedTransportDetails/TransporterBlogDetail.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import TermsAndConditions from './pages/TermsAndConditions.jsx';
import VerifiedHotelsList from './components/verifiedHotel/VerifiedHotelsList.jsx';
import BookHotelsPage from './components/verifiedHotel/BookHotelsPage.jsx';
import HotelDetailsPage from './components/verifiedHotel/HotelDetailsPage.jsx';
import HotelVerifiedReviewViewAll from './components/HotelDetailsPage/HotelVerifiedReviewViewAll.jsx';
import HotelTourPackagesViewAll from './components/HotelDetailsPage/HotelTourPackagesViewAll.jsx';
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
import ItineraryParticularCard from './components/admin/MyItineraries/ItineraryParticularCard.jsx';
import ItineraryCard from './components/admin/MyItineraries/ItineraryCard.jsx';
import BuyLeads from './components/admin/BuyLeads.jsx';
import MyReports from './components/admin/MyReports.jsx';
import MyReviews from './components/admin/MyReviews.jsx';
import MyTeam from './components/admin/MyTeam.jsx';
import SuperAdminDashboard from './pages/SuperAdminDashboard.jsx';
import B2BSignup from './pages/B2BSignup.jsx';
import ProfileGuard from "./components/ProfileGuard";



const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/packages" element={<Packages />} />
        <Route path='/agents' element={<FreeAgents />} />
        <Route path="/destination" element={<Destination />} />
        <Route path="/b2blogin" element={<B2BLogin />} />
        <Route path="/b2bSignup" element={<B2BSignup />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/trending" element={<TrendingDestination />} />
        <Route path="/trending/:destinationId" element={<TrendingDestinationCards />} />
        <Route path="/trending-destinations/:destinationId/:agencyId" element={<AgentDetailPage />} />
        <Route path="/enquiry-form" element={<EnquiryForm />} />
        <Route path="/international" element={<InternationalDestinationsList/>} />
        <Route path='/get-a-quote/:destinationId/:agencyId' element={<GetAQuote />} />
        <Route path='/verified-transporters-list' element={<TranspotersLists />} />
        <Route path='/verified-transport-details/:id' element={<VerifiedTransportDetails />} />
        <Route path='/transporter/:transporterId/:slug/blogs' element={<TransporterBlogPage />} />
        <Route path='/transporter/:transporterId/:slug/blogs/:blogId' element={<TransporterBlogDetail />} />
        <Route path="/verified-transport-details/:id/packages" element={<CustomerTourPackages />} />
        <Route path="/verified-transport-details/:id/reviews" element={<CustomerVerifiedReview />} />
        <Route path='/trending-destination-list' element={<TrendingDestinationLists />} />
        <Route path='/international' element={<InternationalDestinationsList />} />
        <Route path='/international-itinerary/:destinationId' element={<InternationalItinerary />} />
        <Route path='/international-itinerary-detail/:destinationId/:itineraryId' element={<InternationalItineraryDetailPage />} />
        <Route path='/domestic' element={<DomesticDestinationsList />} />
        <Route path='/domestic-itinerary/:destinationId' element={<DomesticItinerary />} />
        <Route path='/domestic-itinerary/:destinationId/:itineraryId' element={<DomesticItineraryDetailPage />} />
        <Route path='/get-a-quote/:type/:destinationId/:id' element={<TourPGetAQuote />} />
        <Route path='/all-hotels' element={<VerifiedHotelsList />} />
        <Route path='/book-hotel/:id' element={<BookHotelsPage />} />
        <Route path='/hotel-details/:id' element={<HotelDetailsPage />} />
        <Route path='/verified-hotel-reviews/:id' element={<HotelVerifiedReviewViewAll />} />
        <Route path='/hotels/:hotelId/packages' element={<HotelTourPackagesViewAll />} />
        {/* Outer Pages */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/Terms-to-use" element={<TermsAndConditions />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<ProfileGuard><AdminPannel /></ProfileGuard>} />
        <Route path="my-leads" element={<ProfileGuard><MyLeads /></ProfileGuard>} />
        <Route path="buy-leads" element={<ProfileGuard><BuyLeads /></ProfileGuard>} />
        <Route path="report" element={<ProfileGuard><MyReports /></ProfileGuard>} />
        <Route path="reviews" element={<ProfileGuard><MyReviews /></ProfileGuard>} />
        <Route path="team" element={<ProfileGuard><MyTeam /></ProfileGuard>} />
        <Route path="profile" element={<Profile />} />
        <Route path="reset-password" element={<ProfileGuard><ResetPassword /></ProfileGuard>} />
        <Route path="Manage-Itianary" element={<ProfileGuard><MyItineraries /></ProfileGuard>} />
        <Route path="Create-Itinary" element={<ProfileGuard><ItineraryForm /></ProfileGuard>} />
        <Route path="destinations/:slug" element={<ProfileGuard><ItineraryParticularCard /></ProfileGuard>} />
        <Route
          path="destination/:slug/destinations/:itineraryId"
          element={<ProfileGuard><ItineraryDetail /></ProfileGuard>}
        />
      </Route>

    </Routes>
  );
};

export default App;
