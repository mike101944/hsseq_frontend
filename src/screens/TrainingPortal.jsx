import React,{ useState,useEffect } from "react";
import { Route, Routes, useLocation,Link } from "react-router-dom";
import { FaCheckCircle, FaPlay, FaChevronLeft, FaChevronRight } from "react-icons/fa";



import { BiSearchAlt2 } from "react-icons/bi";
import { IoSchoolOutline } from "react-icons/io5";
import { LuAlarmClock } from "react-icons/lu";
import { Courses } from "../assets/CourseDummyData";

export function TrainingPortal() {
  const locatioin = useLocation();

  return (
    <div className="w-full  flex flex-col p-4 relative  no-scrollbar ">
      <div className="flex bg-blue-400 px-4 py-4 rounded-md shadow-2xl justify-between items-centerw-full relative">
        <div className="flex flex-row justify-center items-center gap-2 font-serif text-[16px] font-extrabold">
          <h4 className="text-blue-100">Home</h4>
          <small className="text-blue-200">{locatioin.pathname}</small>
        </div>

        <ul className="flex flex-row gap-3 font-serif cursor-pointer text-white">
          <Link to='/training/learningArea' className="hover:bg-blue-100 px-3 py-1 hover:text-blue-400">
            <span>Learning Progress</span>
          </Link>
          <Link to='/training/exams' className="hover:bg-blue-100 px-3 py-1 hover:text-blue-400">
            <span>Quiz and Exams</span>
          </Link>
          <Link to='/training/certification' className="hover:bg-blue-100 px-3 py-1 hover:text-blue-400">
            <span>Certfications</span>
          </Link>
        </ul>
      </div>

      <div className="h-16 text-gray-100">divider hidden</div>

      {/* start here */}

      <Routes>
        <Route index element={<AllCourses />} />
        <Route path="learningArea" element={<LearningProgress />} />
        <Route path="exams" element={<Exams />} />
        <Route path="certification" element={<Certifications />} />
      </Routes>
      {/* end  */}
    </div>
  );
}

const AllCourses = () => {
  return (
    <div className="flex flex-col ">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row p-1 justify-center items-center relative ">
          <input
            type="text"
            placeholder="search course"
            className="w-full bg-gray-50 rounded-md border-none outline-none 
         px-4 py-1 pr-12 transition-all duration-700 ease-in-out focus:ring-1 focus:ring-blue-400 focus:ring-opacity-100 focus:border-blue-400"
          />
          <span className="absolute translate-x-24 text-gray-500">
            <BiSearchAlt2 size={17} />
          </span>
        </div>

        <div className="flex flex-row items-center gap-3">
          <small className="font-sans text-[11px] text-blue-300 font-bold">
            Sort by
          </small>
          <button className="py-2 px-3 rounded-lg hover:bg-blue-300 text-blue-400 hover:text-white font-bold">
            Accupation
          </button>
          <button className="py-2 px-3 rounded-lg hover:bg-blue-300 text-blue-400 hover:text-white font-bold">
            Health
          </button>
          <button className="py-2 px-3 rounded-lg hover:bg-blue-300 text-blue-400 hover:text-white font-bold">
            Environment
          </button>
          <button className="py-2 px-3 rounded-lg hover:bg-blue-300 text-blue-400 hover:text-white font-bold">
            Safety
          </button>
          <button className="py-2 px-3 rounded-lg hover:bg-blue-300 text-blue-400 hover:text-white font-bold">
            Quality
          </button>
        </div>
      </div>

      <div className="h-8 text-gray-100">divider hidden</div>

      <div className="bg-gray-100  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:px-16 py-4 sm:gap-5 ">
        {Courses.map((course, index) => {
          return (
            <div
              key={index}
              className="flex flex-col bg-white rounded-lg shadow-lg font-serif w-64 "
            >
              <div className="flex ">
                <img
                  src={course.image}
                  alt="course-image"
                  className="w-full h-44 object-cover rounded-t-lg  transition duration-300 "
                />
              </div>
              <div className="flex flex-col px-2 py-2">
                <span className="text-gray-300 text-[14px] font-semibold custom-leading py-1">
                  {course.category}
                </span>
                <span className="text-gray-400 text-[14px] font-sans font-bold">
                  {course.title}
                </span>
              </div>
              <div className="flex flex-row justify-between px-2 py-2">
                <span className="flex flex-row justify-center items-center gap-2 font-serif font-semibold text-gray-300">
                  {" "}
                  <LuAlarmClock color="#999" /> <small>3 - 4 hrs</small>
                </span>
                <span className="flex flex-row justify-center items-center gap-2 font-serif font-semibold text-gray-300">
                  {" "}
                  <IoSchoolOutline color="#999" /> <small>1,234 learners</small>
                </span>
              </div>

              <div className="flex flex-row justify-between px-2 py-2">
                <button className="px-2 py-1 bg-gray-50 text-gray-500 text-[14px] border rounded-lg font-semibold">
                  More info
                </button>
                <button className="px-2 py-1 bg-blue-400 text-white text-[14px] font-extrabold rounded-lg">
                  Start learning
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};




const LearningProgress = () => {
  return (
    <div className="h-full  ">
      <div className="w-[200px] bg-blue-300 h-full">
        aside
      </div>
      <div>
        content area
      </div>

 

    </div>
  );
};














const LearningPage = () => {
  const [videos, setVideos] = useState([]);
  const [courseDetails, setCourseDetails] = useState({});
  const [currentVideo, setCurrentVideo] = useState(0);

  useEffect(() => {
    // Simulate API response
    const data = {
      videos: [
        {
          id: 1,
          title: "Cloud computing overview",
          description: "This video introduces cloud computing, explaining the basics and benefits of cloud services.",
          videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
          duration: "3 min",
          completed: true
        },
        {
          id: 2,
          title: "IaaS and PaaS",
          description: "In this video, we cover Infrastructure as a Service (IaaS) and Platform as a Service (PaaS), exploring their differences and use cases.",
          videoUrl: "https://www.w3schools.com/html/movie.mp4",
          duration: "2 min",
          completed: true
        },
        {
          id: 3,
          title: "The Google Cloud network",
          description: "This video explains the structure of the Google Cloud network and how it supports services like storage and computing.",
          videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
          duration: "2 min",
          completed: false
        },
        {
          id: 4,
          title: "Environmental impact",
          description: "Learn about the environmental impact of cloud computing, including energy consumption and sustainability initiatives.",
          videoUrl: "https://www.w3schools.com/html/movie.mp4",
          duration: "1 min",
          completed: false
        },
        {
          id: 5,
          title: "Security",
          description: "This video delves into cloud security, explaining best practices for protecting data in the cloud.",
          videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
          duration: "5 min",
          completed: false
        },
        {
          id: 6,
          title: "Open source ecosystems",
          description: "Understand the role of open source in cloud computing and how it fosters collaboration and innovation.",
          videoUrl: "https://www.w3schools.com/html/movie.mp4",
          duration: "53 sec",
          completed: false
        },
        {
          id: 7,
          title: "Pricing and billing",
          description: "Learn about cloud pricing models and how billing works in platforms like AWS, Google Cloud, and Azure.",
          videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
          duration: "--",
          completed: false
        }
      ],
      courseDetails: {
        courseTitle: "Introduction to Cloud Computing",
        courseDescription: "This course provides an introduction to cloud computing concepts, services, and deployment models. Learn how cloud computing can benefit businesses and individuals.",
        instructor: "John Doe",
        duration: "15 min",
        level: "Beginner"
      }
    };

    setVideos(data.videos);
    setCourseDetails(data.courseDetails);
  }, []);

  return (
    <div className="flex p-2 mt-32">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Course modules</h2>
        <ul>
          {videos.map((video, index) => (
            <li
              key={video.id}
              className={`flex items-center p-2 rounded-lg cursor-pointer transition ${
                index === currentVideo ? "bg-blue-200" : "hover:bg-gray-200"
              }`}
              onClick={() => setCurrentVideo(index)}
            >
              {video.completed ? (
                <FaCheckCircle className="text-green-500 w-5 h-5 mr-2" />
              ) : (
                <FaPlay className="text-gray-500 w-5 h-5 mr-2" />
              )}
              <span className="flex-1">{video.title}</span>
              <span className="text-sm text-gray-500">{video.duration}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center bg-white p-6">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-2xl">
          <div className="p-4">
            {/* Video Player */}
            <div className="relative w-full bg-gray-200 h-64 flex items-center justify-center">
              <video
                className="w-full h-full"
                controls
                src={videos[currentVideo]?.videoUrl}
                type="video/mp4"
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <button
                className="flex items-center text-blue-600 disabled:text-gray-400"
                disabled={currentVideo === 0}
                onClick={() => setCurrentVideo(currentVideo - 1)}
              >
                <FaChevronLeft className="w-5 h-5" /> Previous
              </button>
              <button
                className="flex items-center text-blue-600 disabled:text-gray-400"
                disabled={currentVideo === videos.length - 1}
                onClick={() => setCurrentVideo(currentVideo + 1)}
              >
                Next <FaChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Course Details */}
      <div className="absolute top-0 left-0 w-full p-6 bg-white shadow-md z-10">
        <h2 className="text-2xl font-bold">{courseDetails.courseTitle}</h2>
        <p>{courseDetails.courseDescription}</p>
        <p><strong>Instructor:</strong> {courseDetails.instructor}</p>
        <p><strong>Duration:</strong> {courseDetails.duration}</p>
        <p><strong>Level:</strong> {courseDetails.level}</p>
      </div>
    </div>
  );
};






















const Exams = () => {
  return (
    <div className="flex flex-row justify-center items-center">Exams area</div>
  );
};

const Certifications = () => {
  return (
    <div className="flex flex-row justify-center items-center">
      certifications area
    </div>
  );
};
