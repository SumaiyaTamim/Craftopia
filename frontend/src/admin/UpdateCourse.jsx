import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";


function UpdateCourse() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:4002/api/v1/course/${id}`, {
          withCredentials: true,
        });
        console.log(data);
        setTitle(data.course.title);
        setDescription(data.course.description);
        setPrice(data.course.price);
        setImage(data.course.image.url);
        setImagePreview(data.course.image.url);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch course data");
        setLoading(false);
      }
    };
    fetchCourseData();
  }, [id]);

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImagePreview(reader.result);
      setImage(file);
    };
  };
  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    if (image) {
      formData.append("imageUrl", image);
    }
    const admin = JSON.parse(localStorage.getItem("admin"));
    const token = admin.token;
    if (!token) {
      toast.error("Please login to admin");
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:4002/api/v1/course/update/6820770f64ecb45d25a7fd9e${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      toast.success(response.data.message || "Course updated successfully22");
      navigate("/admin/our-courses"); // Redirect to courses page after update
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.errors);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className='bg-gradient-to-r from-[#FDFCFB] to-[#E2D1C3] min-h-screen flex flex-col items-center'>
      <div className="py-14">
        <div className="bg-[#C19A6B] p-6 rounded-lg shadow-lg w-[800px] m-8 md:m-0 mt-20">
          <h3 className="text-2xl text-white text-center font-semibold mb-8">Update Course</h3>
          <form onSubmit={handleUpdateCourse} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-lg text-white">Title</label>
              <input
                type="text"
                placeholder="Enter your course title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-lg text-white">Description</label>
              <input
                type="text"
                placeholder="Enter your course description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-lg text-white">Price</label>
              <input
                type="number"
                placeholder="Enter your course price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-lg text-white">Course Image</label>
              <div className="flex items-center justify-center">
                <img
                  src={imagePreview ? `${imagePreview}` : "/imgPL.webp"}
                  alt="Course"
                  className="w-full max-w-sm h-auto rounded-md object-cover"
                />
              </div>
              <input
                type="file"
                onChange={changePhotoHandler}
                className="w-full px-3 py-2 border border-white rounded-md outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#80461B] hover:bg-black text-white rounded-md transition-colors duration-200"
            >
              Update Course
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateCourse;