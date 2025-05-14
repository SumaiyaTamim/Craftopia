import React, { useState } from "react";
import logo from "../../src/title-icon.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ password });
    try {
      const response = await axios.post(
        "http://localhost:4002/api/v1/admin/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("AdminLogin successful: ", response.data);
      toast.success(response.data.message);
      navigate("/admin/dashboard");
      localStorage.setItem("admin", JSON.stringify(response.data));
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.errors || "AdminLogin failed!!!");
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#FDFCFB] to-[#E2D1C3] min-h-screen flex flex-col">
      <div className="h-screen container mx-auto flex  items-center justify-center text-white">
        {/* Header */}
        <header className="absolute top-0 left-0 w-full flex justify-between items-center p-5  ">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
            <Link to={"/"} className="text-xl font-bold text-orange-500">
              Craftopia
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to={"/admin/signup"}
              className='text-white bg-[#80461B] text-base py-1 px-3 border border rounded font-semibold
                     hover:bg-black transition-all duration-300'
            >
              Signup
            </Link>
            <Link
              to={"/courses"}
              className='text-white bg-[#80461B] text-base py-1 px-3 border border rounded font-semibold
                     hover:bg-black transition-all duration-300'
            >
              Join now
            </Link>
          </div>
        </header>

        {/* AdminLogin Form */}
        <div className="bg-[#C19A6B] p-8 rounded-lg shadow-lg w-[500px] m-8 md:m-0 mt-20">
           <h2 className="text-2xl font-bold mb-4 text-center">
          <span className="text-[#80461B]"> Craftopia </span>Admin Dashboard Login
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className=" text-white mb-2">
                Email
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Type your email"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className=" text-white mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Please type your password"
                  required
                />
                <span className="absolute right-3 top-3 text-gray-500 cursor-pointer">
                  👁️
                </span>
              </div>
            </div>
            {errorMessage && (
              <div className="mb-4 text-red-500 text-center">
                {errorMessage}
              </div>
            )}
            <button
              type="submit"
              className="w-full  bg-[#80461B] hover:bg-black text-white py-3 px-6 rounded-md transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;