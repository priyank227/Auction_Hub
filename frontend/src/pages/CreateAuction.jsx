import { createAuction } from "../store/slices/auctionSlice";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

const CreateAuction = () => {
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [startingBid, setStartingBid] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const auctionCategories = [
    "Electronics",
    "Furniture",
    "Art & Antiques",
    "Jewelry & Watches",
    "Automobiles",
    "Real Estate",
    "Collectibles",
    "Fashion & Accessories",
    "Sports Memorabilia",
    "Books & Manuscripts",
  ];

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(file);
      setImagePreview(reader.result);
    };
  };

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auction);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || user.role !== "Auctioneer") {
      navigateTo("/");
    }
  }, [isAuthenticated]);

  const handleCreateAuction = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("condition", condition);
    formData.append("startingBid", startingBid);
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    dispatch(createAuction(formData));
  };

  return (
    <section className="w-full min-h-screen flex justify-center bg-gradient-to-br from-[#DBEAFE] to-[#EFF6FF] py-10 px-4">
      <div className="bg-white w-full max-w-4xl p-8 rounded-lg shadow-lg">
        <h2 className="text-[#2563EB] text-3xl font-bold text-center mb-8">
          Create Auction
        </h2>
        <form className="flex flex-col gap-6" onSubmit={handleCreateAuction}>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 rounded-md border-2 border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 rounded-md border-2 border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                required
              >
                <option value="">Select Category</option>
                {auctionCategories.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Condition</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full p-3 rounded-md border-2 border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                required
              >
                <option value="">Select Condition</option>
                <option value="New">New</option>
                <option value="Used">Used</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Starting Bid</label>
              <input
                type="number"
                value={startingBid}
                onChange={(e) => setStartingBid(e.target.value)}
                className="w-full p-3 rounded-md border-2 border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full p-3 rounded-md border-2 border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              required
            ></textarea>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-700 mb-1">Start Time</label>
              <DatePicker
                selected={startTime}
                onChange={(date) => setStartTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full p-3 rounded-md border-2 border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">End Time</label>
              <DatePicker
                selected={endTime}
                onChange={(date) => setEndTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full p-3 rounded-md border-2 border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold text-lg mb-2">Upload Image</label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-[#2563EB] rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition"
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-40 h-auto" />
                ) : (
                  <div className="flex flex-col items-center">
                    <svg
                      className="w-8 h-8 text-[#2563EB] mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4-4m0 0l4-4m-4 4h12"></path>
                    </svg>
                    <p className="text-sm text-[#2563EB]">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-[#2563EB]">PNG, JPG, JPEG</p>
                  </div>
                )}
                <input id="image-upload" type="file" onChange={imageHandler} className="hidden" />
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#2563EB] hover:bg-[#1E40AF] text-white text-lg font-semibold py-3 rounded-md transition-all duration-300 w-full"
          >
            {loading ? "Creating Auction..." : "Create Auction"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateAuction;
