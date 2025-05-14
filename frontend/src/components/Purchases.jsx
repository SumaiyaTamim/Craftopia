import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaDiscourse, FaDownload } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { RiHome2Fill } from "react-icons/ri";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

function Purchases() {
  const [purchases, setPurchase] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  // Token handling
  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  if (!token) {
    navigate("/login");
  }

  // Fetch purchases
  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await axios.get("http://localhost:4002/api/v1/user/purchases", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setPurchase(response.data.courseData);
      } catch (error) {
        setErrorMessage("Failed to fetch purchase data", error);
      }
    };
    fetchPurchases();
  }, []);

  // Logout
  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:4002/api/v1/user/logout", {
        withCredentials: true,
      });
      toast.success(response.data.message);
      localStorage.removeItem("user");
      navigate("/login");
      setIsLoggedIn(false);
    } catch (error) {
      console.log("Error in logging out ", error);
      toast.error(error.response.data.errors || "Error in logging out");
    }
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 bg-[#C19A6B] p-5 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out w-64 z-50`}
      >
        <nav>
          <ul className="mt-16 md:mt-0">
            <li className="mb-4">
              <Link to="/" className="flex items-center text-white">
                <RiHome2Fill className="mr-2" /> Home
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/courses" className="flex items-center text-white">
                <FaDiscourse className="mr-2" /> Courses
              </Link>
            </li>
            <li className="mb-4">
              <a href="#" className="flex items-center text-white">
                <FaDownload className="mr-2" /> Purchases
              </a>
            </li>
            <li className="mb-4">
              <Link to="/settings" className="flex items-center text-white">
                <IoMdSettings className="mr-2" /> Settings
              </Link>
            </li>
            <li>
              {isLoggedIn ? (
                <button onClick={handleLogout} className="flex items-center text-white">
                  <IoLogOut className="mr-2" /> Logout
                </button>
              ) : (
                <Link to="/login" className="flex items-center">
                  <IoLogIn className="mr-2" /> Login
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>

      {/* Sidebar Toggle Button (Mobile) */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-blue-600 text-white p-2 rounded-lg"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <HiX className="text-2xl" />
        ) : (
          <HiMenu className="text-2xl" />
        )}
      </button>

      {/* Main Content */}
      <div
        className={`flex-1 p-4 bg-gradient-to-r from-[#FDFCFB] to-[#E2D1C3] min-h-screen w-full ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } md:ml-64`}
      >
        <h2 className="text-xl font-semibold mb-4">My Purchases</h2>

        {/* Error message */}
        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}

        {/* Render purchases */}
        {purchases.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {purchases.map((purchase, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Course Image - Smaller */}
                <img
                  className="w-full h-32 object-cover"
                  src={purchase.image?.url || "https://via.placeholder.com/200"}
                  alt={purchase.title}
                />
                
                {/* Content - More Compact */}
                <div className="p-3">
                  <h3 className="text-sm font-semibold line-clamp-1">{purchase.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {purchase.description}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs font-bold text-green-700">
                      ${purchase.price}
                    </span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      Purchased
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You have no purchases yet.</p>
        )}
      </div>
    </div>
  );
}

export default Purchases;