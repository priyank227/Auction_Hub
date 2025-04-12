import Spinner from "../custom-components/Spinner";
import { getAuctionDetail } from "../store/slices/auctionSlice";
import { placeBid } from "../store/slices/bidSlice";
import React, { useEffect, useState } from "react";
import { FaGreaterThan } from "react-icons/fa";
import { RiAuctionFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

const AuctionItem = () => {
  const { id } = useParams();
  const { loading, auctionDetail, auctionBidders } = useSelector(
    (state) => state.auction
  );
  const { isAuthenticated } = useSelector((state) => state.user);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(0);
  const handleBid = () => {
    const formData = new FormData();
    formData.append("amount", amount);
    dispatch(placeBid(id, formData));
    dispatch(getAuctionDetail(id));
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/");
    }
    if (id) {
      dispatch(getAuctionDetail(id));
    }
  }, [isAuthenticated, id, dispatch, navigateTo]);

  return (
    <section className="w-full min-h-screen px-6 pt-24 lg:pl-[320px] bg-gradient-to-br from-blue-100 to-indigo-100">
      <div className="text-sm flex gap-2 items-center text-gray-500 mb-6">
        <Link
          to="/"
          className="font-semibold hover:text-indigo-600 transition-all"
        >
          Home
        </Link>
        <FaGreaterThan className="text-gray-400" />
        <Link
          to="/auctions"
          className="font-semibold hover:text-indigo-600 transition-all"
        >
          Auctions
        </Link>
        <FaGreaterThan className="text-gray-400" />
        <p className="text-stone-600">{auctionDetail.title}</p>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="flex flex-col lg:flex-row gap-6 bg-white p-6 rounded-2xl shadow-xl">
              <div className="bg-white w-full max-w-sm h-auto lg:w-72 lg:h-72 overflow-hidden rounded-xl shadow-md">
                <img
                  src={auctionDetail.image?.url}
                  alt={auctionDetail.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col justify-around">
                <h3 className="text-3xl font-bold text-indigo-700">
                  {auctionDetail.title}
                </h3>
                <p className="text-lg font-medium text-gray-700">
                  Condition:{" "}
                  <span className="text-indigo-600 font-semibold">
                    {auctionDetail.condition}
                  </span>
                </p>
                <p className="text-lg font-medium text-gray-700">
                  Minimum Bid:{" "}
                  <span className="text-indigo-600 font-semibold">
                    Rs. {auctionDetail.startingBid}
                  </span>
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-xl">
              <h4 className="text-xl font-semibold mb-2 text-indigo-700">
                Auction Item Description
              </h4>
              <hr className="mb-4" />
              <ul className="space-y-3 list-disc list-inside text-gray-700">
                {auctionDetail.description
                  ?.split(". ")
                  .map((element, index) => (
                    <li key={index}>{element}</li>
                  ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <header className="bg-indigo-100 py-4 px-6 text-xl font-semibold text-indigo-800 border-b border-indigo-200">
                BIDS
              </header>
              <div className="p-4 min-h-[500px]">
                {auctionBidders &&
                new Date(auctionDetail.startTime) < Date.now() &&
                new Date(auctionDetail.endTime) > Date.now() ? (
                  auctionBidders.length > 0 ? (
                    auctionBidders.map((element, index) => (
                      <div
                        key={index}
                        className="py-4 flex items-center justify-between border-b border-gray-200"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={element.profileImage}
                            alt={element.userName}
                            className="w-12 h-12 rounded-full"
                          />
                          <p className="text-base font-medium text-gray-800">
                            {element.userName}
                          </p>
                        </div>
                        <p
                          className={`text-base font-semibold ${
                            index === 0
                              ? "text-green-600"
                              : index === 1
                              ? "text-blue-600"
                              : index === 2
                              ? "text-yellow-600"
                              : "text-gray-500"
                          }`}
                        >
                          {index === 0
                            ? "1st"
                            : index === 1
                            ? "2nd"
                            : index === 2
                            ? "3rd"
                            : `${index + 1}th`}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500 py-10">
                      No bids for this auction yet.
                    </p>
                  )
                ) : Date.now() < new Date(auctionDetail.startTime) ? (
                  <img
                    src="/notStarted.png"
                    alt="Auction not started"
                    className="w-full h-[500px] object-contain"
                  />
                ) : (
                  <img
                    src="/auctionEnded.png"
                    alt="Auction ended"
                    className="w-full h-[500px] object-contain"
                  />
                )}
              </div>
            </div>

            <div className="bg-indigo-600 p-6 rounded-2xl shadow-xl flex items-center justify-between text-white">
              {Date.now() >= new Date(auctionDetail.startTime) &&
              Date.now() <= new Date(auctionDetail.endTime) ? (
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <label className="text-lg font-medium">Place a Bid:</label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="px-4 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-white"
                      placeholder="Bid Amount"
                    />
                  </div>
                  <button
                    onClick={handleBid}
                    className="ml-4 p-3 rounded-full bg-black hover:bg-gray-800 transition-all"
                  >
                    <RiAuctionFill size={24} />
                  </button>
                </>
              ) : new Date(auctionDetail.startTime) > Date.now() ? (
                <p className="text-xl font-semibold">
                  Auction has not started yet!
                </p>
              ) : (
                <p className="text-xl font-semibold">Auction has ended!</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AuctionItem;
