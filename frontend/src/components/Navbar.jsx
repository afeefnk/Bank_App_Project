import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3005/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfileImageUrl(`http://localhost:3005/${response.data.photo}`);
      } catch (error) {
        console.error("Error fetching profile image:", error);
        toast.error("Failed to load profile image");
      }
    };
    fetchProfileImage();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    toast.success("Logged out successfully");
    setTimeout(() => {
      navigate("/");
    }, 1500); // Delay to allow toast to display before redirect
  };

  const notificationIcon = () => {
    toast.info("No Notifications!");
  };

  return (
    <nav className="bg-[#87B4A6] p-3 shadow-md font-inknut">
      <ToastContainer />
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/user/profileDetails">
            {profileImageUrl ? (
              <img
                src={profileImageUrl}
                alt="Profile"
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-300 mr-4"></div>
            )}
          </Link>
        </div>

        <div className="text-black font-bold text-xl pl-60">
          <Link to="/user/home">Home</Link>
        </div>

        <div className="flex space-x-6 text-black">
          <button onClick={notificationIcon} className="hover:text-gray-300 flex items-center">
            <IoMdNotificationsOutline />
          </button>
          <Link to="/user/deposit" className="hover:text-gray-300">
            Deposit
          </Link>
          <Link to="/user/withdrawal" className="hover:text-gray-300">
            Withdrawal
          </Link>
          <button onClick={handleLogout} className="hover:text-gray-300 flex items-center">
            <MdOutlineLogout />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
