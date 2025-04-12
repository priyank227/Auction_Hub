import { deleteAuctionItem } from "../../../store/slices/superAdminSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AuctionItemDelete = () => {
  const { allAuctions } = useSelector((state) => state.auction);
  const dispatch = useDispatch();

  const handleAuctionDelete = (id) => {
    dispatch(deleteAuctionItem(id));
  };

  return (
    <div className="overflow-x-auto rounded-xl bg-gradient-to-br from-[#DBEAFE] to-[#EFF6FF] shadow-lg p-4 border border-blue-100">
      <table className="min-w-full border border-blue-100">
        <thead className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-left">
          <tr>
            <th className="py-3 px-5">Image</th>
            <th className="py-3 px-5">Title</th>
            <th className="py-3 px-5">Actions</th>
          </tr>
        </thead>
        <tbody className="text-slate-700">
          {allAuctions.length > 0 ? (
            allAuctions.map((element) => (
              <tr
                key={element._id}
                className="hover:bg-blue-50 transition-colors duration-300 border-t border-blue-100"
              >
                <td className="py-3 px-5">
                  <img
                    src={element.image?.url}
                    alt={element.title}
                    className="h-14 w-14 object-cover rounded-md border border-blue-200"
                  />
                </td>
                <td className="py-3 px-5 font-medium">{element.title}</td>
                <td className="py-3 px-5 flex gap-2">
                  <Link
                    to={`/auction/details/${element._id}`}
                    className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium py-2 px-4 rounded-md transition-all"
                  >
                    View
                  </Link>
                  <button
                    className="bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium py-2 px-4 rounded-md transition-all"
                    onClick={() => handleAuctionDelete(element._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="3"
                className="py-6 px-5 text-center text-lg text-blue-600 font-semibold"
              >
                No Auctions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AuctionItemDelete;
