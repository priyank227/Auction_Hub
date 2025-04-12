import React from "react";
import {
  FaUser,
  FaGavel,
  FaEnvelope,
  FaDollarSign,
  FaFileInvoice,
  FaRedo,
} from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUser />,
      title: "User Registration",
      description:
        "Sign up or log in to access features like posting auctions, bidding, and sending payment proof.",
    },
    {
      icon: <FaGavel />,
      title: "Role Selection",
      description:
        "Choose your role: 'Bidder' to participate in auctions or 'Auctioneer' to post items for bidding.",
    },
    {
      icon: <FaEnvelope />,
      title: "Winning Bid Notification",
      description:
        "The highest bidder receives an email with the Auctioneer’s payment details (Bank/PayPal).",
    },
    {
      icon: <FaDollarSign />,
      title: "Commission Payment",
      description:
        "Auctioneers must pay a 5% commission once payment is received. Failure to pay may result in restrictions.",
    },
    {
      icon: <FaFileInvoice />,
      title: "Proof of Payment",
      description:
        "Auctioneers submit payment proof. Once verified by Admin, the commission status is updated.",
    },
    {
      icon: <FaRedo />,
      title: "Reposting Items",
      description:
        "If a Bidder doesn’t pay, the Auctioneer can repost the item at no additional charge.",
    },
  ];

  return (
    <section className="w-full min-h-screen px-6 pt-24 pb-12 lg:pl-[320px] bg-gradient-to-br from-[#DBEAFE] to-[#EFF6FF]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center text-[#1e3a8a] text-4xl md:text-5xl font-extrabold mb-12 tracking-tight">
          How <span className="text-[#339af0]">AuctionHub</span> Works
        </h1>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col gap-4 group"
            >
              <div className="text-white bg-[#339af0] group-hover:bg-[#1e7bb9] p-4 w-fit rounded-full text-2xl transition-all duration-300">
                {step.icon}
              </div>
              <h3 className="text-[#1e3a8a] text-xl font-bold">{step.title}</h3>
              <p className="text-gray-700 text-base group-hover:text-[#339af0] transition-all duration-300">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
