import React from "react";

const About = () => {
  const values = [
    {
      id: 1,
      title: "Integrity",
      description:
        "We prioritize honesty and transparency in all our dealings, ensuring a fair and ethical auction experience for everyone.",
    },
    {
      id: 2,
      title: "Innovation",
      description:
        "We continually enhance our platform with cutting-edge technology and features to provide users with a seamless and efficient auction process.",
    },
    {
      id: 3,
      title: "Community",
      description:
        "We foster a vibrant community of buyers and sellers who share a passion for finding and offering exceptional items.",
    },
    {
      id: 4,
      title: "Customer Focus",
      description:
        "We are committed to providing exceptional customer support and resources to help users navigate the auction process with ease.",
    },
  ];

  return (
    <section className="w-full min-h-screen pl-[300px] pr-5 py-16 bg-gradient-to-br from-[#dbeafe] to-[#f0f9ff]">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        <div className="text-center animate-fade-in-up">
          <h1 className="text-sky-700 text-5xl md:text-6xl font-extrabold mb-4">
            Welcome to <span className="text-sky-900">AuctionHub</span>
          </h1>
          <p className="text-sky-800 text-lg md:text-xl font-medium max-w-3xl mx-auto">
            Your trusted destination for seamless online auctions, where excitement meets innovation and community.
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-lg p-8 rounded-xl shadow-2xl animate-fade-in-up">
          <h2 className="text-3xl font-bold text-sky-700 mb-4 text-center">Our Mission</h2>
          <p className="text-sky-800 text-lg text-center">
            At AuctionHub, we aim to redefine the way people buy and sell online. By blending
            technology, transparency, and trust — we create a thrilling and secure marketplace
            for unique items and exciting bidding.
          </p>
        </div>

        <div className="animate-fade-in-up">
          <h2 className="text-3xl font-bold text-center text-sky-700 mb-8">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.id}
                className="p-6 rounded-xl bg-white/80 backdrop-blur-md border border-sky-100 shadow-md hover:shadow-xl transition duration-300 text-center"
              >
                <h3 className="text-xl font-semibold text-sky-700 mb-3">{value.title}</h3>
                <p className="text-sky-800 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-fade-in-up">
          <h2 className="text-3xl font-bold text-sky-700 text-center mb-4">Our Story</h2>
          <p className="text-sky-800 text-lg text-center max-w-4xl mx-auto">
            Founded by Mihir & Priyank, AuctionHub emerged from a shared dream of building a
            trusted digital auction ecosystem. With deep roots in auctioneering and innovation,
            we've cultivated a platform that connects global users with excitement and ease.
          </p>
        </div>

        <div className="animate-fade-in-up">
          <h2 className="text-3xl font-bold text-sky-700 text-center mb-4">Join Us</h2>
          <p className="text-sky-800 text-lg text-center max-w-4xl mx-auto">
            Whether you're hunting rare finds or showcasing your own, AuctionHub is your stage.
            Join our vibrant community and be a part of the next generation of bidding brilliance.
          </p>
        </div>

        <div className="text-center mt-10 animate-fade-in-up">
          <p className="text-sky-600 text-xl font-semibold">
            Thank you for choosing AuctionHub — let's make your auction journey unforgettable!
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
