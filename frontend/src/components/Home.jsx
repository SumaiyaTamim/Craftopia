import { React, useEffect, useState } from 'react';
import logo from '../../src/title-icon.png'
import { Link } from 'react-router-dom'
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import toast from "react-hot-toast";

function Home() {
 const [courses, setCourses] = useState([]);
 const [isLoggedIn, setIsLoggedIn] = useState(false);

  // token
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  //fetch courses 
    useEffect(()=>{
      const fetchCourses=async()=>{
      try{
          const response=await axios.get("http://localhost:4002/api/v1/course/courses", 
          {
            withCredentials: true,
          })
          console.log(response.data.courses)
          setCourses(response.data.courses);
      } catch(error){
          console.log("Error in fetching courses!", error)
      }
  };
  fetchCourses();
  },[])

 const handleLogout = async()=>{
    try{
       const response = await axios.get("http://localhost:4002/api/v1/user/logout", {
        withCredentials: true,
      });
      toast.success(response.data.message);

      setIsLoggedIn(false);

    } catch(error){
      console.log("Error in logging out!", error)
      toast.error(error.response.data.errors || "Error in logging out");
    }
 }

 var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-gradient-to-r from-[#FDFCFB] to-[#E2D1C3] min-h-screen">
    <div className='bg-gradient-to-r from-[#FDFCFB] to-[#E2D1C3] min-h-screen flex flex-col'>
        <div className='ml-20 mr-20'>
            <header className='flex items-center justify-between p-6'>
                <div className='flex items-center space-x-2'>
                  <img src={logo} alt="" className='h-10 w-10'/>
                  <h1 className='text-2xl text-[#5E4E3A] font-bold'>Craftopia</h1>
                </div>
                 <div className="space-x-4">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className='text-white bg-[#80461B] text-base py-1 px-3 border border rounded font-semibold
                     hover:bg-black transition-all duration-300'
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to={"/login"}
                 className='text-white bg-[#80461B] text-base py-1 px-3 border border rounded font-semibold
                     hover:bg-black transition-all duration-300'
                >
                  Login
                </Link>
                <Link
                  to={"/signup"}
                 className='text-white bg-[#80461B] text-base py-1 px-3 border border rounded font-semibold
                     hover:bg-black transition-all duration-300'
                >
                  Signup
                </Link>
              </>
            )}
          </div>
            </header>

            <section className='text-center'>
                <h1 className='text-2xl text-[#5E4E3A] font-semibold'>Craftopia</h1>
                <p className='text-[#5E4E3A]'>Unleash Your Creativity – Master Any Craft, One Skill at a Time.</p><br/>
                <div className='space-x-2'>
                    <Link to={"/courses"} className='text-white bg-[#80461B] text-base py-3 px-6 rounded font-semibold 
                    hover:bg-black
                    transition-all duration-300'>
                    Explore Courses</Link>
                    <button className='text-white bg-[#80461B] text-base py-3 px-6 rounded font-semibold
                     hover:bg-black
                    transition-all duration-300'>
                    Free Previews</button>
                </div>
            </section>

           <section className="px-4 py-8">
  <Slider {...settings}>
    {courses.map((course) => (
      <div key={course._id} className="px-2"> {/* Padding between slides */}
        <div className="h-full bg-[#C19A6B] rounded-lg overflow-hidden shadow-lg">
          {/* Image Container (Fixed Height) */}
          <div className="h-48 w-full overflow-hidden"> 
            <img
              className="w-full h-full object-cover" /* Ensures image fills container */
              src={course.image.url}
              alt={course.title}
            />
          </div>
          {/* Content (Fixed Padding) */}
          <div className="p-4 text-center">
            <h2 className="text-lg font-bold text-white truncate"> 
              {course.title}
            </h2>
            <button className="mt-4 bg-[#80461B] text-white py-2 px-6 rounded-full hover:bg-black transition-all duration-300">
              Enroll Now
            </button>
          </div>
        </div>
      </div>
      
    ))}
  </Slider>
</section>

            <hr className='border-[#80461B]'/>
            <footer className='my-8'>
                <div className='grid grid-cols-1 md:grid-cols-3'>
                    <div className="flex flex-col items-center md:items-start">
                    {/* <div className='flex items-center space-x-2'>
                    <img src={logo} alt="" className='h-10 w-10'/>
                    <h1 className='text-2xl text-[#5E4E3A] font-bold'>Craftopia</h1>
                    </div> */}
                    <div className=''>
                        <p className='text-[#5E4E3A] mb-2'>Connect With Fellow Creators!</p>
                        <div className='flex space-x-4'>
                        <a href="" className="text-2xl text-[#80461B] hover:text-black duration-300"><FaFacebook /></a>
                        <a href=""  className="text-2xl text-[#80461B] hover:text-black duration-300"><AiFillInstagram /></a>
                        <a href=""  className="text-2xl text-[#80461B] hover:text-black duration-300"><FaXTwitter /></a>
                        </div>
                        </div>
                    </div>


                <div className=''>
                <p className='text-[#5E4E3A] mb-2'>Craft Along With Us!</p>
                <div className='flex space-x-4'>
                <a href="" className="text-2xl text-[#80461B] hover:text-black duration-300"><FaYoutube /></a>
                <a href="" className="text-2xl text-[#80461B] hover:text-black duration-300"><IoLogoGithub /></a>
                </div>
                </div>
                
            
            <div className="items-center mt-6 md:mt-0 flex flex-col">
              {/* <p className="text-[#5E4E3A] font-bold mb-4">
                 © 2025 Craftopia. All rights reserved. 
              </p> */}
              <ul className="text-center text-[#5E4E3A]">
                <li className="hover:text-black cursor-pointer duration-300">
                  Terms & Conditions
                </li>
                <li className="hover:text-black cursor-pointer duration-300">
                  Privacy Policy
                </li>
                <li className="hover:text-black cursor-pointer duration-300">
                  Refund & Cancellation
                  <br/>
                  <br/>
                </li>
              </ul>
            </div>
            </div>
            </footer>

        </div>
    </div>
    </div>
  )
}

export default Home