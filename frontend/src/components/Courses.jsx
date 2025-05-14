import React, { useState, useEffect } from "react";
import axios from "axios"; 
import { FaCircleUser } from "react-icons/fa6";
import { RiHome2Fill } from "react-icons/ri";
import { FaDiscourse } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { HiMenu, HiX } from "react-icons/hi"; 
import logo from "../../src/title-icon.png";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Check token
  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:4002/api/v1/course/courses", {
          withCredentials: true,
        });
        setCourses(response.data.courses);
        setLoading(false);
      } catch (error) {
        console.log("error in fetchCourses ", error);
      }
    };
    fetchCourses();
  }, []);

  // Logout 
  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:4002/api/v1/course/courses", {
        withCredentials: true,
      });
      toast.success(response.data.message);
      localStorage.removeItem("user");
      setIsLoggedIn(false);
    } catch (error) {
      console.log("Error in logging out ", error);
      toast.error(error.response.data.errors || "Error in logging out");
    }
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-20 text-3xl text-gray-800"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <HiX /> : <HiMenu />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-[#C19A6B] w-64 p-5 transform z-10 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static`}
      >
        <div className="flex items-center mb-10 mt-10 md:mt-0">
          <img src={logo} alt="Profile" className="rounded-full h-12 w-12" />
        </div>
        <nav>
          <ul>
            <li className="mb-4">
              <a href="/" className="flex items-center text-white">
                <RiHome2Fill className="mr-2" /> Home
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="flex items-center text-white">
                <FaDiscourse className="mr-2" /> Courses
              </a>
            </li>
            <li className="mb-4">
              <a href="/purchases" className="flex items-center text-white">
                <FaDownload className="mr-2" /> Purchases
              </a>
            </li>
            <li className="mb-4">
              <a href="#" className="flex items-center text-white">
                <IoMdSettings className="mr-2" /> Settings
              </a>
            </li>
            <li>
              {isLoggedIn ? (
                <Link to={"/"}
                  className="flex items-center text-white"
                  onClick={handleLogout}
                >
                  <IoLogOut className="mr-2" /> Logout
                </Link>
              ) : (
                <Link to={"/login"} className="flex items-center text-white">
                  <IoLogIn className="mr-2" /> Login
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className={`ml-0 bg-gradient-to-r from-[#FDFCFB] to-[#E2D1C3] min-h-screen w-full p-4 md:p-6 ${
        isSidebarOpen ? "md:ml-64" : "md:ml-0"
      }`}>
        <header className="flex justify-end items-center mb-6">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search..."
                className="border border-gray-300 rounded-l-full px-4 py-2 h-10 focus:outline-none w-40 md:w-auto"
              />
              <button className="h-10 border bg-[#80461B] rounded-r-full px-4 flex items-center justify-center">
                <FiSearch className="text-xl text-white" />
              </button>
            </div>
            <FaCircleUser className="text-3xl text-[#80461B]" />
          </div>
        </header>

        {/* Courses Section */}
        <div className="overflow-y-auto h-[75vh] pr-2">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : courses.length === 0 ? (
            <p className="text-center text-gray-500">No courses available</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition-shadow duration-300"
                >
                  <img
                    src={course.image.url}
                    alt={course.title}
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                  <div className="p-3">
                    <h2 className="font-semibold text-sm line-clamp-1 mb-1">{course.title}</h2>
                    <p className="text-gray-600 text-xs line-clamp-2 mb-2">
                      {course.description}
                    </p>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-xs">
                        ${course.price}{" "}
                        <span className="text-gray-500 text-xs line-through">$150</span>
                      </span>
                      <span className="text-green-600 text-xs font-semibold bg-green-100 px-2 py-1 rounded">
                        20% off
                      </span>
                    </div>
                    <Link
                      to={`/buy/${course._id}`}
                      className="block w-full bg-[#80461B] text-white text-center text-xs px-3 py-2 rounded hover:bg-black transition-colors duration-300"
                    >
                      Buy Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Courses;