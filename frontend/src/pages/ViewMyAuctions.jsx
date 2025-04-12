import CardTwo from "../custom-components/CardTwo";
import Spinner from "../custom-components/Spinner";
import { getMyAuctionItems } from "../store/slices/auctionSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ViewMyAuctions = () => {
  const { myAuctions, loading } = useSelector((state) => state.auction);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || user.role !== "Auctioneer") {
      navigateTo("/");
    }
    dispatch(getMyAuctionItems());
  }, [dispatch, isAuthenticated, user.role, navigateTo]);

  return (
    <div className="w-full min-h-screen px-4 py-20 lg:pl-[320px] bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-screen-2xl mx-auto">
        <h1 className="text-indigo-600 text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-12 tracking-tight">
          My Auctions
        </h1>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Spinner />
          </div>
        ) : (
          <div
            className={`grid gap-6 ${
              myAuctions.length > 0
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            }`}
          >
            {myAuctions.length > 0 ? (
              myAuctions.map((element) => (
                <CardTwo
                  key={element._id}
                  title={element.title}
                  startingBid={element.startingBid}
                  endTime={element.endTime}
                  startTime={element.startTime}
                  imgSrc={element.image?.url}
                  id={element._id}
                />
              ))
            ) : (
              <div className="col-span-full text-center mt-12">
                <h3 className="text-gray-500 text-xl lg:text-2xl font-medium">
                  You haven’t posted any auctions yet.
                </h3>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewMyAuctions;
