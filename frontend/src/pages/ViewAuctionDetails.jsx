import Spinner from "../custom-components/Spinner";
import { getAuctionDetail } from "../store/slices/auctionSlice";
import React, { useEffect } from "react";
import { FaGreaterThan } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

const ViewAuctionDetails = () => {
  const { id } = useParams();
  const { loading, auctionDetail, auctionBidders } = useSelector(
    (state) => state.auction
  );
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated || user.role === "Bidder") {
      navigateTo("/");
    }
    if (id) {
      dispatch(getAuctionDetail(id));
    }
  }, [isAuthenticated, id, dispatch, navigateTo, user.role]);

  return (
    <>
      <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col bg-gradient-to-br from-[#DBEAFE] to-[#EFF6FF]">
        <div className="text-[16px] flex flex-wrap gap-2 items-center">
          <Link
            to="/"
            className="font-semibold transition-all duration-300 hover:text-lightblue-600"
          >
            Home
          </Link>
          <FaGreaterThan className="text-stone-400" />
          <Link
            to={"/view-my-auctions"}
            className="font-semibold transition-all duration-300 hover:text-lightblue-600"
          >
            My Auctions
          </Link>
          <FaGreaterThan className="text-stone-400" />
          <p className="text-stone-600 font-medium text-lg">{auctionDetail.title}</p>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <div className="flex gap-6 flex-col 2xl:flex-row">
            <div className="flex-1 flex flex-col gap-5">
              <div className="flex gap-6 flex-col lg:flex-row">
                <div className="bg-white w-[100%] lg:w-40 lg:h-40 flex justify-center items-center p-5 border border-gray-300 rounded-lg shadow-md">
                  <img
                    src={auctionDetail.image?.url}
                    alt={auctionDetail.title}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
                <div className="flex flex-col justify-between pb-4">
                  <h3 className="text-[#111] text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">
                    {auctionDetail.title}
                  </h3>
                  <p className="text-lg font-semibold">
                    Condition:{" "}
                    <span className="text-[#00A7E1]">{auctionDetail.condition}</span>
                  </p>
                  <p className="text-lg font-semibold">
                    Minimum Bid:{" "}
                    <span className="text-[#00A7E1]">
                      Rs.{auctionDetail.startingBid}
                    </span>
                  </p>
                </div>
              </div>
              <p className="text-xl font-semibold">Auction Item Description</p>
              <hr className="my-3 border-t-[1px] border-t-stone-700" />
              {auctionDetail.description && (
                <ul>
                  {auctionDetail.description.split(". ").map((element, index) => (
                    <li key={index} className="text-[18px] my-2">
                      {element}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex-1">
              <header className="bg-lightblue-200 py-4 text-[24px] font-semibold px-4 rounded-t-lg shadow-md">
                BIDS
              </header>
              <div className="bg-white px-4 py-5 rounded-b-lg min-h-fit lg:min-h-[650px]">
                {auctionBidders && auctionBidders.length > 0 && 
                  new Date(auctionDetail.startTime) < Date.now() && 
                  new Date(auctionDetail.endTime) > Date.now() ? (
                    auctionBidders.map((element, index) => (
                      <div key={index} className="py-3 flex items-center justify-between border-b border-gray-300">
                        <div className="flex flex-1 items-center gap-4">
                          <img
                            src={element.profileImage}
                            alt={element.userName}
                            className="w-12 h-12 rounded-full my-2 hidden md:block"
                          />
                          <p className="text-[18px] font-semibold">{element.userName}</p>
                        </div>
                        <p className="flex-1 text-center">{element.amount}</p>
                        <p
                          className={`text-[20px] font-semibold flex-1 text-end ${index === 0 ? "text-green-600" : index === 1 ? "text-blue-600" : index === 2 ? "text-yellow-600" : "text-gray-600"}`}
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
                  ) : Date.now() < new Date(auctionDetail.startTime) ? (
                    <div className="w-full text-center py-10">
                      <img
                        src="/notStarted.png"
                        alt="Auction not started"
                        className="max-w-[300px] mx-auto"
                      />
                      <p className="text-lg font-semibold text-stone-600 mt-2">
                        Auction hasn't started yet.
                      </p>
                    </div>
                  ) : (
                    <div className="w-full text-center py-10">
                      <img
                        src="/auctionEnded.png"
                        alt="Auction ended"
                        className="max-w-[300px] mx-auto"
                      />
                      <p className="text-lg font-semibold text-stone-600 mt-2">
                        Auction has ended.
                      </p>
                    </div>
                  )}
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default ViewAuctionDetails;
