import React, { useState } from "react";
import logo from "../../src/title-icon.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4002/api/v1/user/signup",
        {
          firstName,
          lastName,
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
      console.log("Signup successful: ", response.data);
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.errors || "Signup failed!");
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
            <Link to={"/"} className="text-xl font-bold text-[#80461B]">
              Craftopia
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to={"/login"}
              className='text-white bg-[#80461B] text-base py-1 px-3 border border rounded font-semibold
                     hover:bg-black transition-all duration-300'
            >
              Login
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

        {/* Signup Form */}
        <div className="bg-[#C19A6B] p-3 rounded-lg shadow-lg w-[500px] m-8 md:m-0 mt-20">
          <h2 className="text-xl font-bold mb-4 text-center">
            Join<span className="text-[#80461B]"> Craftopia </span>today and unlock your potential in art and design!
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="firstname" className=" text-white mb-2">
                Firstname
              </label>
              <input
                type="text"
                id="firstname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                 className="w-full p-3 rounded-md bg-white text-black border focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Type your firstname"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastname" className=" text-white mb-2">
                Lastname
              </label>
              <input
                type="text"
                id="lastname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
               className="w-full p-3 rounded-md bg-white text-black border focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Type your lastname"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className=" text-white mb-2">
                Email
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-md bg-white text-black border focus:outline-none focus:ring-2 focus:ring-black"
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
                 className="w-full p-3 rounded-md bg-white text-black border focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Type your password"
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
              className="w-full bg-[#80461B] hover:bg-black text-white py-3 px-6 rounded-md transition"
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;