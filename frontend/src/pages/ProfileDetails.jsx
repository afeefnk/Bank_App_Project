import React, { useEffect, useState } from "react";
import bgimg from "../assets/bgimg.png";
import axios from "axios";

const ProfileDetails = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3005/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfileData();
  }, []);

  if (!profileData) return <div>Loading...</div>;
  return (
    <div>
      <div
        className="flex flex-col items-center justify-start min-h-screen"
        style={{
          backgroundImage: `url(${bgimg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          overflow: "hidden", // Prevents overflow on smaller screens
        }}
      >
        <div className="flex justify-start items-start mt-12 w-full px-8">
          {/* Card with profile details */}
          <div className="relative bg-[#87B4A6] p-8 rounded-3xl shadow-lg max-w-3xl text-center">
            {/* Profile Image */}
            <div className="flex justify-center mb-4">
              <img
                src={`http://localhost:3005/${profileData.photo}`}
                alt="Profile"
                className="rounded-full w-24 h-24 object-cover"
              />
            </div>
            <h2 className="text-lg text-black mb-9 font-medium">
              {profileData.name}
            </h2>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4 text-left text-lg">
              {/* Left Column */}
              <div>
                <p className="font-bold text-sm">Email</p>
                <p className="text-green-900 text-sm pl-6 mb-10">
                  {profileData.email}
                </p>

                <p className="font-bold text-sm">Address</p>
                <p className="text-green-900 text-sm pl-6 mb-10">
                  {profileData.address}
                </p>

                <p className="font-bold text-sm">Age</p>
                <p className="text-green-800 text-lg pl-6 mb-10 font-sans font-medium">
                  {profileData.age}
                </p>

                <p className="font-bold text-sm">Aadhar</p>
                <p className="text-green-800 text-lg pl-6 mb-10 font-sans font-medium">
                  {profileData.aadhar}
                </p>
              </div>

              {/* Right Column */}
              <div>
                <p className="font-bold text-sm">User Name</p>
                <p className="text-green-900 text-sm pl-6 mb-10 pr-10">
                  {profileData.username}
                </p>

                <p className="font-bold text-sm">DOB</p>
                <p className="text-green-800 text-lg pl-6 mb-10 pr-10 font-sans font-medium">
                  {new Date(profileData.dob).toISOString().split("T")[0]}
                </p>

                <p className="font-bold text-sm">Phone number</p>
                <p className="text-green-800 text-lg pl-6 mb-10 pr-10 font-sans font-medium">
                  {profileData.phone}
                </p>

                <p className="font-bold text-sm">Pan no.</p>
                <p className="text-green-800 text-lg pl-6 mb-10 pr-10 font-sans font-medium">
                  {profileData.pan}
                </p>
              </div>
            </div>

            {/* Edit Icon in a small white circle */}
            <a href="/user/updateProfile">
              <div
                className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-md cursor-pointer"
                style={{ width: "40px", height: "40px" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
