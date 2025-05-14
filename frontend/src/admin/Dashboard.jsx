import React from "react";
import { Link } from "react-router-dom";
import logo from "../../src/title-icon.png";
import toast from "react-hot-toast";
import axios from "axios";

function Dashboard() {
  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:4002/api/v1/admin/logout", {
        withCredentials: true,
      });
      toast.success(response.data.message);
      localStorage.removeItem("admin");
    } catch (error) {
      console.log("Error in logging out ", error);
      toast.error(error.response.data.errors || "Error in logging out");
    }
  };
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-[#C19A6B] p-5">
        <div className="flex items-center flex-col mb-10">
          {/* <img src={logo} alt="Profile" className="rounded-full h-20 w-20" /> */}
          {/* <h2 className="text-lg font-semibold mt-4"></h2> */}
        </div>
        <nav className="flex flex-col space-y-4">
          <Link to="/admin/our-courses">
            <button className="w-full text-white font-semibold bg-transparent py-2">
              Courses
            </button>
          </Link>
          <Link to="/admin/create-course">
            <button className="w-full  text-white font-semibold bg-transparent py-2">
              Create Course
            </button>
          </Link>

          <Link to="/">
            <button className="w-full  text-white font-semibold bg-transparent py-2">
              Home
            </button>
          </Link>
          <Link to="/admin/login">
            <button
              onClick={handleLogout}
              className="w-full  text-white font-semibold bg-transparent py-2"
            >
              Logout
            </button>
          </Link>
        </nav>
      </div>
      <div className="flex h-screen items-center justify-center ml-[40%] font-semibold">
        Welcome!
      </div>
    </div>
  );
}

export default Dashboard;