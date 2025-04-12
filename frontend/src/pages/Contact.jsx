import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigateTo = useNavigate();

  const handleContactForm = (e) => {
    e.preventDefault();
    setLoading(true);

    const templateParams = {
      name,
      email,
      phone,
      subject,
      message,
    };

    emailjs
      .send(
        "service_xzos3bw",
        "template_161i7fs",
        templateParams,
        "5nk9o7t8cXVEdaIYs"
      )
      .then(() => {
        toast.success("🎉 Thank you! Your message has been sent.");
        setLoading(false);
        navigateTo("/");
      })
      .catch(() => {
        toast.error("❌ Failed to send message. Please try again.");
        setLoading(false);
      });
  };

  return (
    <section className="w-full min-h-screen px-6 py-20 bg-gradient-to-br from-indigo-100 via-blue-50 to-white flex justify-center items-start lg:pl-[320px]">
      <div className="w-full max-w-3xl bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-white/40 animate-fadeIn">
        <form onSubmit={handleContactForm} className="space-y-6">
          <h2 className="text-4xl font-bold text-indigo-700 text-center mb-6">
            📬 Get in Touch
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">Your Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">Your Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                placeholder="john@example.com"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">Your Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                placeholder="+1234567890"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                placeholder="Project Inquiry"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">Message</label>
            <textarea
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Type your message here..."
              required
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-lg"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
