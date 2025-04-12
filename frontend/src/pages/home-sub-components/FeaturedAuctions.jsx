import Card from "../../custom-components/Card";
import React from "react";
import { useSelector } from "react-redux";

const FeaturedAuctions = () => {
  const { allAuctions = [], loading } = useSelector((state) => state.auction);

  return (
    <section className="my-12 px-4 py-6 bg-gradient-to-br from-[#dbeafe] via-[#e0f2fe] to-[#f0f9ff] rounded-lg shadow-inner">
      <div className="text-center mb-8">
        <h3 className="text-sky-800 text-2xl sm:text-3xl font-bold">
          🌟 Featured Auctions
        </h3>
        <p className="text-sky-600 text-sm mt-2">
          Explore some of our top picks for you to bid on!
        </p>
      </div>

      {loading ? (
        <p className="text-center text-sky-600 text-lg font-medium animate-pulse">
          Loading auctions...
        </p>
      ) : allAuctions.length === 0 ? (
        <p className="text-center text-sky-500 text-lg font-medium">
          No featured auctions available at the moment.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allAuctions.slice(0, 8).map((element) => (
            <Card
              title={element.title}
              imgSrc={element.image?.url}
              startTime={element.startTime}
              endTime={element.endTime}
              startingBid={element.startingBid}
              id={element._id}
              key={element._id}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedAuctions;
