import { register } from "../store/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [profileImagePreview, setProfileImagePreview] = useState("");

  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("role", role);
    formData.append("profileImage", profileImage);
    role === "Auctioneer" &&
      (formData.append("bankAccountName", bankAccountName),
      formData.append("bankAccountNumber", bankAccountNumber),
      formData.append("bankName", bankName),
      formData.append("paypalEmail", paypalEmail));
    dispatch(register(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, loading, isAuthenticated]);

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProfileImagePreview(reader.result);
      setProfileImage(file);
    };
  };

  return (
    <>
      <section className="w-full m-0 min-h-screen bg-gradient-to-br from-[#DBEAFE] to-[#EFF6FF] flex justify-center items-center py-10">
        <div className="bg-white shadow-xl rounded-lg w-full max-w-3xl p-8">
          <h1 className="text-[#1f6ea6] text-4xl font-bold text-center mb-6">Register</h1>
          <form className="flex flex-col gap-8" onSubmit={handleRegister}>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#1f6ea6]">Personal Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-lg text-[#4a4a4a]">Full Name</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="p-3 rounded-md border-2 border-[#1f6ea6] focus:outline-none focus:ring-2 focus:ring-[#1f6ea6] transition-all duration-300"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-lg text-[#4a4a4a]">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-3 rounded-md border-2 border-[#1f6ea6] focus:outline-none focus:ring-2 focus:ring-[#1f6ea6] transition-all duration-300"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-lg text-[#4a4a4a]">Phone</label>
                  <input
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="p-3 rounded-md border-2 border-[#1f6ea6] focus:outline-none focus:ring-2 focus:ring-[#1f6ea6] transition-all duration-300"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-lg text-[#4a4a4a]">Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="p-3 rounded-md border-2 border-[#1f6ea6] focus:outline-none focus:ring-2 focus:ring-[#1f6ea6] transition-all duration-300"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-lg text-[#4a4a4a]">Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="p-3 rounded-md border-2 border-[#1f6ea6] focus:outline-none focus:ring-2 focus:ring-[#1f6ea6] transition-all duration-300"
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="Auctioneer">Auctioneer</option>
                    <option value="Bidder">Bidder</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-lg text-[#4a4a4a]">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-3 rounded-md border-2 border-[#1f6ea6] focus:outline-none focus:ring-2 focus:ring-[#1f6ea6] transition-all duration-300"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-lg text-[#4a4a4a]">Profile Image</label>
                <div className="flex items-center gap-4">
                  <img
                    src={profileImagePreview ? profileImagePreview : "/imageHolder.jpg"}
                    alt="Profile Preview"
                    className="w-16 h-16 rounded-full"
                  />
                  <input type="file" onChange={imageHandler} className="p-3 rounded-md" />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#1f6ea6]">Payment Method Details</h2>
              <p className="text-sm text-gray-500">
                Fill Payment Details Only If you are registering as an Auctioneer
              </p>
              {role === "Auctioneer" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="text-lg text-[#4a4a4a]">Bank Name</label>
                      <select
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        className="p-3 rounded-md border-2 border-[#1f6ea6] focus:outline-none focus:ring-2 focus:ring-[#1f6ea6] transition-all duration-300"
                      >
                        <option value="">Select Your Bank</option>
                        <option value="HDFC">HDFC</option>
                        <option value="SBI">SBI</option>
                        <option value="KOTAK">KOTAK</option>
                        <option value="BOB">BOB</option>
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label className="text-lg text-[#4a4a4a]">Bank Account Number</label>
                      <input
                        type="text"
                        value={bankAccountNumber}
                        onChange={(e) => setBankAccountNumber(e.target.value)}
                        className="p-3 rounded-md border-2 border-[#1f6ea6] focus:outline-none focus:ring-2 focus:ring-[#1f6ea6] transition-all duration-300"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-lg text-[#4a4a4a]">Paypal Email</label>
                    <input
                      type="email"
                      value={paypalEmail}
                      onChange={(e) => setPaypalEmail(e.target.value)}
                      className="p-3 rounded-md border-2 border-[#1f6ea6] focus:outline-none focus:ring-2 focus:ring-[#1f6ea6] transition-all duration-300"
                    />
                  </div>
                </>
              )}
            </div>
            <button
              className="bg-[#1f6ea6] text-white font-semibold py-3 rounded-md text-xl w-full hover:bg-[#155a8a] transition-all duration-300"
              type="submit"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignUp;
