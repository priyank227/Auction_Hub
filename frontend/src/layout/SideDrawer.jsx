import React, { useState } from "react";
import { RiAuctionFill } from "react-icons/ri";
import { MdLeaderboard, MdDashboard } from "react-icons/md";
import { SiGooglesearchconsole } from "react-icons/si";
import { BsFillInfoSquareFill } from "react-icons/bs";
import {
  FaFacebook,
  FaInstagram,
  FaUserCircle,
  FaFileInvoiceDollar,
  FaEye,
} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircleOutline, IoIosCreate } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/userSlice";
import { Link } from "react-router-dom";

const SideDrawer = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      {/* Hamburger Icon for Mobile */}
      <div
        onClick={() => setShow(!show)}
        className="fixed right-5 top-5 bg-[#1F2937] text-white text-3xl p-2 rounded-md hover:bg-[#3B82F6] lg:hidden shadow-lg"
      >
        <GiHamburgerMenu />
      </div>

      {/* Side Drawer */}
      <div
        className={`w-full sm:w-[300px] bg-[#111827] h-full fixed top-0 left-0 z-50 transition-all duration-300 ease-in-out transform ${
          show ? "translate-x-0" : "translate-x-[-100%]"
        } lg:translate-x-0`}
      >
        <div className="relative flex flex-col p-6">
          <Link to={"/"} className="text-3xl font-bold mb-6 text-[#3B82F6]">
            Auction<span className="text-[#F9FAFB]">Hub</span>
          </Link>

          <ul className="flex flex-col gap-6">
            <li>
              <Link
                to={"/auctions"}
                className="flex items-center text-xl font-medium text-slate-300 hover:text-[#3B82F6] transition-all duration-200 gap-3"
              >
                <RiAuctionFill /> Auctions
              </Link>
            </li>
            <li>
              <Link
                to={"/leaderboard"}
                className="flex items-center text-xl font-medium text-slate-300 hover:text-[#3B82F6] transition-all duration-200 gap-3"
              >
                <MdLeaderboard /> Leaderboard
              </Link>
            </li>

            {isAuthenticated && user?.role === "Auctioneer" && (
              <>
                <li>
                  <Link
                    to={"/submit-commission"}
                    className="flex items-center text-xl font-medium text-slate-300 hover:text-[#3B82F6] transition-all duration-200 gap-3"
                  >
                    <FaFileInvoiceDollar /> Submit Commission
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/create-auction"}
                    className="flex items-center text-xl font-medium text-slate-300 hover:text-[#3B82F6] transition-all duration-200 gap-3"
                  >
                    <IoIosCreate /> Create Auction
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/view-my-auctions"}
                    className="flex items-center text-xl font-medium text-slate-300 hover:text-[#3B82F6] transition-all duration-200 gap-3"
                  >
                    <FaEye /> View My Auctions
                  </Link>
                </li>
              </>
            )}

            {isAuthenticated && user?.role === "Super Admin" && (
              <li>
                <Link
                  to={"/dashboard"}
                  className="flex items-center text-xl font-medium text-slate-300 hover:text-[#3B82F6] transition-all duration-200 gap-3"
                >
                  <MdDashboard /> Dashboard
                </Link>
              </li>
            )}
          </ul>

          {!isAuthenticated ? (
            <div className="my-6 flex gap-3">
              <Link
                to={"/sign-up"}
                className="bg-[#3B82F6] text-white text-lg py-2 px-6 rounded-md hover:bg-[#2563EB] transition-all duration-200"
              >
                Sign Up
              </Link>
              <Link
                to={"/login"}
                className="text-[#3B82F6] border-2 border-[#3B82F6] text-lg py-2 px-6 rounded-md font-semibold hover:bg-white hover:text-[#2563EB] transition-all duration-200"
              >
                Login
              </Link>
            </div>
          ) : (
            <div className="my-6">
              <button
                onClick={handleLogout}
                className="bg-[#3B82F6] text-white text-lg py-2 px-6 rounded-md font-semibold hover:bg-[#2563EB] transition-all duration-200"
              >
                Logout
              </button>
            </div>
          )}

          <hr className="my-4 border-t-[#374151]" />

          <ul className="flex flex-col gap-6">
            {isAuthenticated && (
              <li>
                <Link
                  to={"/me"}
                  className="flex items-center text-xl font-medium text-slate-300 hover:text-[#3B82F6] transition-all duration-200 gap-3"
                >
                  <FaUserCircle /> Profile
                </Link>
              </li>
            )}
            <li>
              <Link
                to={"/how-it-works-info"}
                className="flex items-center text-xl font-medium text-slate-300 hover:text-[#3B82F6] transition-all duration-200 gap-3"
              >
                <SiGooglesearchconsole /> How it works
              </Link>
            </li>
            <li>
              <Link
                to={"/about"}
                className="flex items-center text-xl font-medium text-slate-300 hover:text-[#3B82F6] transition-all duration-200 gap-3"
              >
                <BsFillInfoSquareFill /> About Us
              </Link>
            </li>
          </ul>

          <IoMdCloseCircleOutline
            onClick={() => setShow(!show)}
            className="absolute top-4 right-4 text-3xl sm:hidden cursor-pointer text-slate-300 hover:text-[#3B82F6] transition-all duration-200"
          />
        </div>

        {/* Footer */}
        <div className="flex flex-col items-center mt-8">
          <div className="flex gap-4 mb-4">
            <Link
              to="/"
              className="text-xl text-slate-500 hover:text-blue-700 p-2 bg-white rounded-full transition-all duration-200"
            >
              <FaFacebook />
            </Link>
            <Link
              to="/"
              className="text-xl text-slate-500 hover:text-pink-500 p-2 bg-white rounded-full transition-all duration-200"
            >
              <FaInstagram />
            </Link>
          </div>
          <Link
            to={"/contact"}
            className="text-slate-500 font-semibold hover:text-[#3B82F6] transition-all duration-200"
          >
            Contact Us
          </Link>
          <p className="text-slate-500 mt-2">&copy; AuctionHub</p>
          <p className="text-slate-500 mt-2">
            Designed By{" "}
            <Link
              to={"/"}
              className="font-semibold text-[#3B82F6] hover:text-[#2563EB] transition-all duration-200"
            >
              Priyank & Mihir
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SideDrawer;
