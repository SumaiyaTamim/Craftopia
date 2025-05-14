import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function OurCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const admin = JSON.parse(localStorage.getItem("admin"));
  const token = admin?.token;

  if (!token) {
    toast.error("Please login to admin");
    navigate("/admin/login");
  }

  // fetch courses
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

  // delete courses code
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4002/api/v1/course/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      const updatedCourses = courses.filter((course) => course._id !== id);
      setCourses(updatedCourses);
    } catch (error) {
      console.log("Error in deleting course ", error);
      toast.error(error.response.data.errors || "Error in deleting course");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className='bg-gradient-to-r from-[#FDFCFB] to-[#E2D1C3] px-6 py-8 md:px-12 lg:px-16'>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {courses.map((course) => (
          <div key={course._id} className="bg-white shadow-sm rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
            {/* Course Image - Smaller */}
            <img
              src={course?.image?.url}
              alt={course.title}
              className="h-32 w-full object-cover"
            />
            
            {/* Course Content - More Compact */}
            <div className="p-3">
              <h2 className="text-sm font-semibold text-gray-800 line-clamp-1">
                {course.title}
              </h2>
              
              {/* Course Description - Shorter */}
              <p className="text-gray-600 text-xs mt-1 line-clamp-2">
                {course.description}
              </p>
              
              {/* Price Section - Compact */}
              <div className="flex justify-between items-center mt-2">
                <div className="text-xs font-bold text-gray-800">
                  {course.price}
                  <span className="ml-1 text-gray-500 text-xs line-through">$300</span>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  10% off
                </span>
              </div>

              {/* Buttons - Smaller */}
              <div className="flex justify-between mt-3 space-x-2">
                <Link
                  to={`/admin/update-course/${course._id}`}
                  className="bg-green-500 text-white py-1 px-3 text-xs rounded hover:bg-green-600 transition-colors"
                >
                  Update
                </Link>
                <button
                  onClick={() => handleDelete(course._id)}
                  className="bg-red-500 text-white py-1 px-3 text-xs rounded hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OurCourses;