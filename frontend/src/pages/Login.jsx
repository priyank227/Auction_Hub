import { login } from "../store/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, isAuthenticated } = useSelector((state) => state.user);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    dispatch(login(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, isAuthenticated, loading]);

  return (
    <section className="w-full m-0 h-screen flex justify-center items-center bg-gradient-to-br from-[#DBEAFE] to-[#EFF6FF]">
      <div className="bg-white shadow-lg rounded-xl px-8 py-10 w-full max-w-md flex flex-col gap-6">
        <h1 className="text-[#1f6ea6] text-4xl font-semibold text-center">
          Welcome Back!
        </h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[#1f6ea6] text-lg">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-lg py-3 px-4 bg-[#f0f8ff] border-2 border-[#1f6ea6] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1f6ea6] transition-all duration-300"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[#1f6ea6] text-lg">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-lg py-3 px-4 bg-[#f0f8ff] border-2 border-[#1f6ea6] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1f6ea6] transition-all duration-300"
              required
            />
          </div>
          <button
            className="bg-[#1f6ea6] text-white font-semibold py-3 rounded-md text-lg hover:bg-[#155a8a] transition-all duration-300"
            type="submit"
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>
        <div className="flex justify-center mt-4 text-sm text-[#1f6ea6]">
          <span>Don't have an account? </span>
          <a href="/sign-up" className="text-[#155a8a] hover:underline">
            Sign Up
          </a>
        </div>
      </div>
    </section>
  );
};

export default Login;
