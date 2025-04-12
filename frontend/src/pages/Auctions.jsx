import Card from "../custom-components/Card";
import Spinner from "../custom-components/Spinner";
import React from "react";
import { useSelector } from "react-redux";

const Auctions = () => {
  const { allAuctions, loading } = useSelector((state) => state.auction);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <article className="w-full min-h-screen px-6 pt-24 pb-16 lg:pl-[320px] bg-gradient-to-br from-[#DBEAFE] to-[#EFF6FF]">
          <section className="max-w-7xl mx-auto">
            <h1 className="text-center text-[#1e3a8a] text-4xl md:text-5xl font-extrabold mb-12 tracking-tight">
              Browse <span className="text-[#339af0]">Live Auctions</span>
            </h1>

            {allAuctions.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {allAuctions.map((element) => (
                  <div
                    key={element._id}
                    className="bg-white/50 backdrop-blur-md rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-1"
                  >
                    <Card
                      title={element.title}
                      startTime={element.startTime}
                      endTime={element.endTime}
                      imgSrc={element.image?.url}
                      startingBid={element.startingBid}
                      id={element._id}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600 text-xl mt-12">
                No auctions found. Please check back later!
              </p>
            )}
          </section>
        </article>
      )}
    </>
  );
};

export default Auctions;
