import React from "react";
import { RiAuctionFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// Auction Card Component
const AuctionCard = ({ element }) => {
  return (
    <Link
      to={`/auction/item/${element._id}`}
      key={element._id}
      className="flex flex-col gap-4 bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-md hover:shadow-xl border border-transparent hover:border-sky-300 transition-all duration-300"
    >
      <div className="flex items-center gap-4">
        <img
          src={element.image?.url}
          alt={element.title}
          className="w-16 h-16 rounded-md border border-sky-100 object-cover"
        />
        <p className="font-semibold text-sky-900 text-sm line-clamp-2">
          {element.title}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-sky-700 text-sm font-semibold">Starting Bid:</p>
        <p className="text-sky-600 font-bold">₹ {element.startingBid}</p>
      </div>
      <div>
        <p className="text-sky-700 font-medium text-sm">Starting Time:</p>
        <p className="text-sky-800 text-xs">{element.startTime}</p>
      </div>
    </Link>
  );
};

const UpcomingAuctions = () => {
  const { allAuctions } = useSelector((state) => state.auction);

  const today = new Date().toDateString();
  const auctionsStartingToday = allAuctions.filter((item) => {
    const auctionDate = new Date(item.startTime).toDateString();
    return auctionDate === today;
  });

  return (
    <section className="my-12 px-4 py-6 bg-gradient-to-br from-[#dbeafe] via-[#e0f2fe] to-[#f0f9ff] rounded-lg shadow-inner">
      <div className="mb-8 text-center">
        <h3 className="text-sky-800 text-2xl sm:text-3xl font-bold">
          🔔 Today's Auctions
        </h3>
        <p className="text-sky-600 text-sm mt-2">
          Check out what’s coming up today and place your winning bid!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Highlight Card */}
        <div className="bg-gradient-to-r from-sky-400 to-sky-600 text-white rounded-xl p-6 flex flex-col justify-center items-center shadow-md hover:shadow-xl transition">
          <div className="bg-white text-sky-600 p-3 rounded-full text-2xl mb-4 shadow-md">
            <RiAuctionFill />
          </div>
          <h3 className="text-xl font-bold">Auctions for</h3>
          <h2 className="text-2xl font-extrabold">Today</h2>
        </div>

        {/* Auction Cards */}
        {auctionsStartingToday.length > 0 ? (
          auctionsStartingToday.slice(0, 6).map((element) => (
            <AuctionCard key={element._id} element={element} />
          ))
        ) : (
          <div className="col-span-full text-center text-sky-700 font-medium">
            No auctions scheduled for today.
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingAuctions;
