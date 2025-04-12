import {
  clearAllSuperAdminSliceErrors,
  getAllPaymentProofs,
  getAllUsers,
  getMonthlyRevenue,
} from "../../store/slices/superAdminSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuctionItemDelete from "./sub-components/AuctionItemDelete";
import BiddersAuctioneersGraph from "./sub-components/BiddersAuctioneersGraph";
import PaymentGraph from "./sub-components/PaymentGraph";
import PaymentProofs from "./sub-components/PaymentProofs";
import Spinner from "../../custom-components/Spinner";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.superAdmin);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();

  useEffect(() => {
    dispatch(getMonthlyRevenue());
    dispatch(getAllUsers());
    dispatch(getAllPaymentProofs());
    dispatch(clearAllSuperAdminSliceErrors());
  }, []);

  useEffect(() => {
    if (user.role !== "Super Admin" || !isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="w-full min-h-screen bg-gradient-to-br from-[#DBEAFE] to-[#EFF6FF] px-5 pt-20 lg:pl-[320px] flex flex-col gap-12">
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-500 to-indigo-500">
            Dashboard
          </h1>

          <div className="grid grid-cols-1 gap-10">
            {/* Monthly Payments */}
            <section className="bg-white shadow-xl rounded-2xl p-6 border-l-4 border-sky-500">
              <h3 className="text-2xl font-semibold text-slate-800 mb-4">
                Monthly Total Payments Received
              </h3>
              <PaymentGraph />
            </section>

            {/* Users */}
            <section className="bg-white shadow-xl rounded-2xl p-6 border-l-4 border-blue-400">
              <h3 className="text-2xl font-semibold text-slate-800 mb-4">
                Users Overview
              </h3>
              <BiddersAuctioneersGraph />
            </section>

            {/* Payment Proofs */}
            <section className="bg-white shadow-xl rounded-2xl p-6 border-l-4 border-teal-400">
              <h3 className="text-2xl font-semibold text-slate-800 mb-4">
                Payment Proofs
              </h3>
              <PaymentProofs />
            </section>

            {/* Auction Item Delete */}
            <section className="bg-white shadow-xl rounded-2xl p-6 border-l-4 border-rose-400">
              <h3 className="text-2xl font-semibold text-slate-800 mb-4">
                Delete Items From Auction
              </h3>
              <AuctionItemDelete />
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
