import {
  deletePaymentProof,
  getSinglePaymentProofDetail,
  updatePaymentProof,
} from "../../../store/slices/superAdminSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PaymentProofs = () => {
  const { paymentProofs, singlePaymentProof } = useSelector(
      (state) => state.superAdmin
  );
  const [openDrawer, setOpenDrawer] = useState(false);
  const dispatch = useDispatch();

  const handlePaymentProofDelete = (id) => {
      dispatch(deletePaymentProof(id));
  };

  const handleFetchPaymentDetail = (id) => {
      dispatch(getSinglePaymentProofDetail(id));
  };

  useEffect(() => {
      if (singlePaymentProof && Object.keys(singlePaymentProof).length > 0) {
          setOpenDrawer(true);
      }
  }, [singlePaymentProof]);

  return (
      <>
          <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-100 mt-5">
                  <thead className="bg-indigo-800 text-white">
                      <tr>
                          <th className="w-1/3 py-2">User ID</th>
                          <th className="w-1/3 py-2">Status</th>
                          <th className="w-1/3 py-2">Actions</th>
                      </tr>
                  </thead>
                  <tbody className="text-gray-800">
                      {paymentProofs.length > 0 ? (
                          paymentProofs.map((element, index) => {
                              return (
                                  <tr key={index}>
                                      <td className="py-2 px-4 text-center">{element.userId}</td>
                                      <td className="py-2 px-4 text-center">{element.status}</td>
                                      <td className="flex items-center py-4 justify-center gap-3">
                                          <button
                                              className="bg-sky-500 hover:bg-sky-600 text-white py-1 px-3 rounded transition-all duration-300"
                                              onClick={() => handleFetchPaymentDetail(element._id)}
                                          >
                                              Update
                                          </button>
                                          <button
                                              className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-800 transition-all duration-300"
                                              onClick={() => handlePaymentProofDelete(element._id)}
                                          >
                                              Delete
                                          </button>
                                      </td>
                                  </tr>
                              );
                          })
                      ) : (
                          <tr className="text-center text-xl text-indigo-600 py-3">
                              <td>No payment proofs are found.</td>
                          </tr>
                      )}
                  </tbody>
              </table>
          </div>
          <Drawer setOpenDrawer={setOpenDrawer} openDrawer={openDrawer} />
      </>
  );
};

export default PaymentProofs;

export const Drawer = ({ setOpenDrawer, openDrawer }) => {
  const { singlePaymentProof, loading } = useSelector(
      (state) => state.superAdmin
  );
  const [amount, setAmount] = useState(singlePaymentProof.amount || "");
  const [status, setStatus] = useState(singlePaymentProof.status || "");

  const dispatch = useDispatch();
  const handlePaymentProofUpdate = () => {
      dispatch(updatePaymentProof(singlePaymentProof._id, status, amount));
  };

  useEffect(() => {
    if (openDrawer) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  
    // Cleanup jab component unmount ho
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openDrawer]);

  return (
      <>
          <section
  className={`fixed left-0 bottom-0 w-full h-full z-50 bg-[#00000087] transition-transform duration-300 ease-in-out ${
    openDrawer && singlePaymentProof.userId ? "translate-y-0" : "translate-y-full"
  }`}
>
<div
    onClick={(e) => e.stopPropagation()}
    className="bg-white w-full max-h-[90vh] overflow-y-auto sm:max-w-[640px] sm:m-auto rounded-t-2xl pt-6 px-5 py-8"
  >
                  <div className="w-full px-5 py-8 sm:max-w-[640px] sm:m-auto">
                      <h3 className="text-[#4B0082] text-3xl font-semibold text-center mb-0">
                          Update Payment Proof
                      </h3>
                      <p className="text-gray-700">
                          You can update payment status and amount.
                      </p>
                      <form className="flex flex-col gap-5 my-5">
                          <div className="flex flex-col gap-3">
                              <label className="text-[16px] text-gray-600 ">User ID</label>
                              <input
                                  type="text"
                                  value={singlePaymentProof.userId || ""}
                                  disabled
                                  onChange={(e) => e.target.value}
                                  className="text-xl px-1 py-2 bg-transparent border-[1px] border-gray-600  rounded-md focus:outline-none  text-gray-600"
                              />
                          </div>
                          <div className="flex flex-col gap-3">
                              <label className="text-[16px] text-gray-600">Amount</label>
                              <input
                                  type="number"
                                  value={amount}
                                  onChange={(e) => setAmount(e.target.value)}
                                  className="text-xl px-1 py-2 bg-transparent border-[1px] border-gray-600  rounded-md focus:outline-none"
                              />
                          </div>
                          <div className="flex flex-col gap-3">
                              <label className="text-[16px] text-gray-600">Status</label>
                              <select
                                  value={status}
                                  onChange={(e) => setStatus(e.target.value)}
                                  className="text-xl px-1 py-2 bg-transparent border-[1px] border-gray-600  rounded-md focus:outline-none"
                              >
                                  <option value="Pending">Pending</option>
                                  <option value="Approved">Approved</option>
                                  <option value="Rejected">Rejected</option>
                                  <option value="Settled">Settled</option>
                              </select>
                          </div>
                          <div className="flex flex-col gap-3">
                              <label className="text-[16px] text-gray-600">Comment</label>
                              <textarea
                                  rows={5}
                                  value={singlePaymentProof.comment || ""}
                                  onChange={(e) => e.target.value}
                                  disabled
                                  className="text-xl px-1 py-2 bg-transparent border-[1px] border-gray-600  rounded-md focus:outline-none text-gray-600"
                              />
                          </div>
                          <div>
                              <Link
                                  to={singlePaymentProof.proof?.url || ""}
                                  className="bg-[#4B0082] flex justify-center w-full py-2 rounded-md text-white font-semibold text-xl transition-all duration-300 hover:bg-[#3a006a]"
                                  target="_blank"
                              >
                                  Payment Proof (SS)
                              </Link>
                          </div>
                          <div>
                              <button
                                  type="button"
                                  className="bg-blue-600 flex justify-center w-full py-2 rounded-md text-white font-semibold text-xl transition-all duration-300 hover:bg-blue-700"
                                  onClick={handlePaymentProofUpdate}
                              >
                                  {loading ? "Updating Payment Proof" : "Update Payment Proof"}
                              </button>
                          </div>
                          <div>
                              <button
                                  type="button"
                                  className="bg-yellow-600 flex justify-center w-full py-2 rounded-md text-white font-semibold text-xl transition-all duration-300 hover:bg-yellow-700"
                                  onClick={() => setOpenDrawer(false)}
                              >
                                  Cancel
                              </button>
                          </div>
                      </form>
                  </div>
              </div>
          </section>
      </>
  );
};
