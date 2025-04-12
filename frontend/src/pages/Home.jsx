import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FeaturedAuctions from "./home-sub-components/FeaturedAuctions";
import UpcomingAuctions from "./home-sub-components/UpcomingAuctions";
import Leaderboard from "./home-sub-components/Leaderboard";
import Spinner from "../custom-components/Spinner";

const Home = () => {
  const howItWorks = [
    { title: "Post Items", description: "Auctioneer posts items for bidding." },
    { title: "Place Bids", description: "Bidders place bids on listed items." },
    {
      title: "Win Notification",
      description: "Highest bidder receives a winning email.",
    },
    {
      title: "Payment & Fees",
      description: "Bidder pays; auctioneer pays 5% fee.",
    },
  ];

  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-[#dbeafe] via-[#e0f2fe] to-[#f0f9ff] px-5 pt-20 lg:pl-[320px] flex flex-col justify-center py-4 animate__animated animate__fadeIn">
      
      {/* Hero Section */}
      <div className="text-center animate__animated animate__fadeInDown">
        <p className="text-[#3b82f6] font-medium text-lg mb-4 tracking-wide">
          Transparency Leads to Your Victory
        </p>
        <h1 className="text-[#1e3a8a] text-4xl sm:text-5xl md:text-6xl font-extrabold mb-2">
          Transparent Auctions
        </h1>
        <h2 className="text-[#2563eb] text-3xl sm:text-4xl md:text-5xl font-semibold mb-6">
          Be The Winner
        </h2>
        {!isAuthenticated && (
          <div className="flex justify-center gap-6 my-8 animate__animated animate__zoomIn animate__delay-1s">
            <Link
              to="/sign-up"
              className="bg-gradient-to-r from-[#3b82f6] to-[#2563eb] text-white font-bold py-3 px-8 rounded-xl shadow-lg transition transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="text-[#2563eb] border-2 border-[#2563eb] hover:bg-[#e0f2fe] font-bold py-3 px-8 rounded-xl shadow-md transition transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              Login
            </Link>
          </div>
        )}
      </div>

      {/* How It Works Section */}
      <div className="mt-20 animate__animated animate__fadeInUp">
        <h3 className="text-center text-[#1e3a8a] text-2xl sm:text-3xl md:text-4xl font-semibold mb-10">
          How It Works
        </h3>
        <div className="flex flex-col md:flex-row md:flex-wrap justify-center gap-8">
          {howItWorks.map((element) => (
            <div
              key={element.title}
              className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 w-full md:w-[45%] lg:w-[22%] shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <h5 className="text-xl font-bold text-[#1e3a8a] mb-2">{element.title}</h5>
              <p className="text-gray-700 text-sm">{element.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Auctions */}
      <div className="mt-24">
        <FeaturedAuctions />
      </div>

      {/* Upcoming Auctions */}
      <div className="mt-24">
        <UpcomingAuctions />
      </div>

      {/* Leaderboard */}
      <div className="mt-24">
        <Leaderboard />
      </div>
    </section>
  );
};

export default Home;
