import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Leaderboard = () => {
  const { leaderboard } = useSelector((state) => state.user);

  return (
    <section className="my-8 lg:px-5 bg-gradient-to-br from-[#DBEAFE] to-[#EFF6FF]">
      <div className="flex flex-col min-[340px]:flex-row min-[340px]:gap-2">
        <h3 className="text-sky-700 text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">
          Top 10
        </h3>
        <h3 className="text-sky-500 text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">
          Bidders Leaderboard
        </h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border my-5 border-sky-200">
          <thead className="bg-sky-100">
            <tr>
              <th className="py-2 px-4 text-left text-sky-700">Profile Pic</th>
              <th className="py-2 px-4 text-left text-sky-700">Username</th>
              <th className="py-2 px-4 text-left text-sky-700">Bid Expenditure</th>
              <th className="py-2 px-4 text-left text-sky-700">Auctions Won</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {leaderboard && leaderboard.length > 0 ? (
              leaderboard.slice(0, 10).map((element, index) => (
                <tr key={element._id} className="border-b border-sky-100 hover:bg-sky-50">
                  <td className="flex gap-2 items-center py-2 px-4">
                    <span className="text-sky-400 font-semibold text-xl w-7 hidden sm:block">
                      {index + 1}
                    </span>
                    <img
                      src={element.profileImage?.url || "/default-avatar.png"}
                      alt={element.userName}
                      className="h-12 w-12 object-cover rounded-full border border-sky-200"
                    />
                  </td>
                  <td className="py-2 px-4">{element.userName}</td>
                  <td className="py-2 px-4">{element.moneySpent}</td>
                  <td className="py-2 px-4">{element.auctionsWon}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-5 text-center text-sky-500">
                  No leaderboard data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Go to Leaderboard Link */}
      <Link
        to="/leaderboard"
        className="border-2 border-sky-300 text-sky-600 font-bold text-xl w-full py-2 flex justify-center rounded-md hover:border-sky-500 hover:text-sky-700 transition-all duration-300"
      >
        Go to Leaderboard
      </Link>
    </section>
  );
};

export default Leaderboard;
