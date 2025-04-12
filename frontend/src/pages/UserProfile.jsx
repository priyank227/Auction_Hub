import Spinner from "../custom-components/Spinner";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated]);

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-[#dbeafe] to-[#eff6ff] px-5 pt-20 lg:pl-[320px] flex flex-col py-4">
      {loading ? (
        <Spinner />
      ) : (
        <div className="bg-white/70 backdrop-blur-md mx-auto w-full max-w-4xl rounded-2xl shadow-2xl p-8">
          {/* Profile Image */}
          <div className="flex justify-center mb-8">
            <img
              src={user.profileImage?.url}
              alt="Profile"
              className="w-36 h-36 rounded-full border-4 border-sky-500 shadow-md"
            />
          </div>

          {/* Welcome Message */}
          <div className="text-center mb-10">
            <h3 className="text-sky-800 text-4xl font-bold mb-2">Hi, {user.userName} 👋</h3>
            <p className="text-lg text-sky-600">{user.role} Profile</p>
          </div>

          {/* Personal Details */}
          <div className="mb-10">
            <h3 className="text-sky-700 text-2xl font-semibold mb-4 border-b border-sky-300 pb-2">Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Username", value: user.userName },
                { label: "Email", value: user.email },
                { label: "Phone", value: user.phone },
                { label: "Address", value: user.address },
                { label: "Role", value: user.role },
                { label: "Joined On", value: user.createdAt?.substring(0, 10) },
              ].map(({ label, value }, i) => (
                <div key={i}>
                  <label className="text-sm font-medium text-sky-700">{label}</label>
                  <input
                    type="text"
                    defaultValue={value}
                    className="w-full mt-2 p-3 bg-white border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
                    disabled
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Auctioneer Payment Info */}
          {user.role === "Auctioneer" && (
            <div className="mb-10">
              <h3 className="text-sky-700 text-2xl font-semibold mb-4 border-b border-sky-300 pb-2">Payment Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: "Bank Name", value: user.paymentMethods.bankTransfer.bankName },
                  { label: "Bank Account Number", value: user.paymentMethods.bankTransfer.bankAccountNumber },
                  { label: "Account Name", value: user.paymentMethods.bankTransfer.bankAccountName },
                  { label: "Paypal Email", value: user.paymentMethods.paypal.paypalEmail },
                ].map(({ label, value }, i) => (
                  <div key={i}>
                    <label className="text-sm font-medium text-sky-700">{label}</label>
                    <input
                      type="text"
                      defaultValue={value}
                      className="w-full mt-2 p-3 bg-white border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
                      disabled
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other Details */}
          <div>
            <h3 className="text-sky-700 text-2xl font-semibold mb-4 border-b border-sky-300 pb-2">Other User Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {user.role === "Auctioneer" && (
                <div>
                  <label className="text-sm font-medium text-sky-700">Unpaid Commissions</label>
                  <input
                    type="text"
                    defaultValue={user.unpaidCommission}
                    className="w-full mt-2 p-3 bg-white border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
                    disabled
                  />
                </div>
              )}
              {user.role === "Bidder" && (
                <>
                  <div>
                    <label className="text-sm font-medium text-sky-700">Auctions Won</label>
                    <input
                      type="text"
                      defaultValue={user.auctionsWon}
                      className="w-full mt-2 p-3 bg-white border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-sky-700">Money Spent</label>
                    <input
                      type="text"
                      defaultValue={user.moneySpent}
                      className="w-full mt-2 p-3 bg-white border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
                      disabled
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default UserProfile;
