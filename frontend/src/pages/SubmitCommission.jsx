import { postCommissionProof } from "../store/slices/commissionSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SubmitCommission = () => {
  const [proof, setProof] = useState("");
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.commission);

  const proofHandler = (e) => {
    const file = e.target.files[0];
    setProof(file);
  };

  const handlePaymentProof = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("proof", proof);
    formData.append("amount", amount);
    formData.append("comment", comment);
    dispatch(postCommissionProof(formData));
  };

  return (
    <section className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-[#dbeafe] to-[#eff6ff] py-10 px-4">
      <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-lg border border-sky-100">
        <h3 className="text-sky-700 text-2xl sm:text-3xl font-bold text-center mb-6">
          Upload Payment Proof
        </h3>
        <form onSubmit={handlePaymentProof} className="flex flex-col gap-5">
          {/* Amount Field */}
          <div className="flex flex-col gap-1">
            <label className="text-sky-700 font-medium">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="p-3 rounded-md border border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
              placeholder="Enter payment amount"
              required
            />
          </div>

          {/* Proof Upload */}
          <div className="flex flex-col gap-1">
            <label className="text-sky-700 font-medium">Payment Proof (Screenshot)</label>
            <input
              type="file"
              onChange={proofHandler}
              className="p-3 rounded-md border border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
              required
            />
          </div>

          {/* Comment */}
          <div className="flex flex-col gap-1">
            <label className="text-sky-700 font-medium">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={5}
              className="p-3 rounded-md border border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all resize-none"
              placeholder="Optional message or note"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-sky-600 hover:bg-sky-700 text-white text-lg font-semibold py-3 rounded-md transition-all duration-300 disabled:opacity-70"
          >
            {loading ? "Uploading..." : "Upload Payment Proof"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default SubmitCommission;
