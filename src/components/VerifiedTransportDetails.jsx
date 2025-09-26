import React, { useState } from "react";
import { useParams } from "react-router-dom";
import transportData from "../data/transportData";
import Header from "./verifiedTransportDetails/Header";
import Gallery from "./verifiedTransportDetails/Gallery";
import VerifyTour from "./verifiedTransportDetails/VerifyTour";
import QuickSection from "./verifiedTransportDetails/QuickSection";
import HappyCustomer from "./verifiedTransportDetails/HappyCustomer";
import VerifiedReview from "./verifiedTransportDetails/VerifiedReview";
import RightSide from "./verifiedTransportDetails/RightSide";
// import HappyCustomerImages from "./verifiedTransportDetails/HappyCustomerImages";
import HappyCustomerVideo from "./verifiedTransportDetails/HappyCustomerVideo";
import CustomerBlogs from "../components/verifiedTransportDetails/CustomerBlogs";

const VerifiedTransportDetails = () => {
  const { id } = useParams();
  const travelItem = transportData.find((item) => item.id === parseInt(id));
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [saved, setSaved] = useState(false);
  if (!travelItem) return <div className="p-4">Travel details not found.</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${name}! We'll contact you at ${mobile} shortly.`);
    setName("");
    setMobile("");
  };

  return (
    <div className="w-full px-4 py-6 bg-white min-h-screen font-sans">
      {/* HEADER */}
     
       <Header travelItem={travelItem}/>

       {/* MAIN CONTENT SPLIT */}
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        {/* LEFT SIDE */}
        <div className="w-full lg:w-[80%] flex flex-col gap-6 mb-6 border rounded-md p-5 shadow-sm relative">

          {/* Photos */}
           <Gallery  travelItem={travelItem}/>
           {/* Blog Section (only for this transporter) */}
            <section id="blog">
              <CustomerBlogs transporterId={travelItem.id} transporterName={travelItem.title}  />
            </section>
          {/* Tour Packages */}
        
            <VerifyTour travelItem={travelItem}/>

         {/* Quick Info & Highlights from the Business */}
           
            <QuickSection/>

            <HappyCustomer/>
            {/* <HappyCustomerImages /> */}
            <HappyCustomerVideo />
          {/* Reviews */}
          <VerifiedReview/>
         
        </div>
        {/* RIGHT SIDE */}
        <div className="w-full lg:w-[20%] flex flex-col gap-6">
          <RightSide travelItem={travelItem} />
        </div>

    </div>
    </div>
  );
};

export default VerifiedTransportDetails;
