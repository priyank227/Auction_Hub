import Spinner from "../custom-components/Spinner";
import React from "react";
import { useSelector } from "react-redux";

const Leaderboard = () => {
  const { loading, leaderboard } = useSelector((state) => state.user);

  const getRankBadge = (index) => {
    switch (index) {
      case 0:
        return "🥇";
      case 1:
        return "🥈";
      case 2:
        return "🥉";
      default:
        return index + 1;
    }
  };

  return (
    <section className="w-full min-h-screen px-6 pt-24 pb-16 lg:pl-[320px] bg-gradient-to-br from-[#DBEAFE] to-[#EFF6FF]">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="text-center text-[#1e3a8a] text-4xl md:text-5xl font-extrabold mb-10 tracking-tight">
            Top <span className="text-[#339af0]">Bidders</span> Leaderboard
          </h1>

          <div className="overflow-x-auto bg-white/40 backdrop-blur-md shadow-lg rounded-2xl p-4">
            <table className="min-w-full table-auto">
              <thead className="bg-[#e0f2fe] text-[#1e3a8a]">
                <tr>
                  <th className="py-3 px-6 text-left font-semibold text-sm uppercase">Rank</th>
                  <th className="py-3 px-6 text-left font-semibold text-sm uppercase">Profile</th>
                  <th className="py-3 px-6 text-left font-semibold text-sm uppercase">Username</th>
                  <th className="py-3 px-6 text-left font-semibold text-sm uppercase">Bid Expenditure</th>
                  <th className="py-3 px-6 text-left font-semibold text-sm uppercase">Auctions Won</th>
                </tr>
              </thead>
              <tbody className="text-gray-800 text-base">
                {leaderboard.slice(0, 100).map((element, index) => (
                  <tr
                    key={element._id}
                    className="border-b border-gray-200 hover:bg-[#f1f5f9] transition-all duration-200"
                  >
                    <td className="py-3 px-6 font-bold text-lg text-center">{getRankBadge(index)}</td>
                    <td className="py-3 px-6">
                      <img
                        src={element.profileImage?.url}
                        alt={element.userName}
                        className="h-10 w-10 object-cover rounded-full border-2 border-gray-300"
                      />
                    </td>
                    <td className="py-3 px-6 font-medium">{element.userName}</td>
                    <td className="py-3 px-6 text-[#1e40af] font-semibold">₹ {element.moneySpent}</td>
                    <td className="py-3 px-6">{element.auctionsWon}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
};

export default Leaderboard;
