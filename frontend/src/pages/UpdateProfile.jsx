import React, { useEffect, useState } from "react";
import bgimg from "../assets/bgimg.png";
import { FaUpload } from "react-icons/fa";
import { useProfile } from "../context/profileContext";
import axios from "axios";

const UpdateProfile = () => {
  const { profileData, loading } = useProfile();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    dob: "",
    address: "",
    phone: "",
    age: "",
    pancard: "",
    aadhar: "",
    image: null
  });

  useEffect(() => {
    console.log("Profile data:", profileData);
    if (profileData) {
      const formattedDob = profileData.dob
        ? new Date(profileData.dob).toISOString().split("T")[0]
        : "";

        setFormData({
          name: profileData.name || "",
          username: profileData.username || "",
          email: profileData.email || "",
          dob: formattedDob || "",
          address: profileData.address || "",
          phone: profileData.phone || "",
          age: profileData.age || "",
          pancard: profileData.pan || "",
          aadhar: profileData.aadhar || "",
          image: profileData.image || null
        })
    }
  }, [ profileData])

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formDataObj = new FormData();

    // Append all form data to formDataObj
    for (const key in formData) {
      formDataObj.append(key, formData[key]);
    }

    try {
      // Send a PUT request to update the user profile
      const response = await axios.put("http://localhost:3005/api/users/update", formDataObj, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      // Optionally handle the response
      alert(response.data.message);
      window.location.href = '/user/profileDetails';
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
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
        <div className="flex justify-start items-center mt-12 w-full px-8 ml-28">
          {/* Edit Profile Card */}
          <div
            className="bg-[#B7DACF] p-6 rounded-3xl shadow-lg max-w-xl w-full text-center"
            style={{ transform: "translateX(-30px)" }} // Shift the card 30px to the left
          >
            {/* Title */}
            <h2 className="text-xl font-bold text-black mb-4">Edit Profile</h2>

            {/* Form */}
            <div className="grid grid-cols-2 gap-4 text-left text-md">
              {/* Left Column */}
              <div>
                <p className=" text-xs mb-1">Name</p>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={handleChange}
                  value={formData.name}
                  className="w-full px-3 py-1 mb-7  rounded-md border focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder:text-xs"
                />

                <p className=" text-xs mb-1">Email</p>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  value={formData.email}
                  className="w-full px-3 py-1 mb-7 rounded-md border focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder:text-xs"
                />

                <p className="text-xs mb-1">Address</p>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  onChange={handleChange}
                  value={formData.address}
                  className="w-full px-3 py-1 mb-7 rounded-md border focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder:text-xs"
                />

                <p className=" text-xs mb-1">Age</p>
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  onChange={handleChange}
                  value={formData.age}
                  className="w-full px-3 py-1 mb-7 rounded-md border focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder:text-xs"
                />

                <p className="text-xs mb-1">Aadhar</p>
                <input
                  type="text"
                  name="aadhar"
                  placeholder="Aadhar"
                  onChange={handleChange}
                  value={formData.aadhar}
                  className="w-full px-3 py-1 mb-7 rounded-md border focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder:text-xs"
                />
              </div>

              {/* Right Column */}
              <div>
                <p className=" text-xs mb-1">User Name</p>
                <input
                  type="text"
                  name="username"
                  placeholder="User name"
                  onChange={handleChange}
                  value={formData.username}
                  className="w-full px-3 py-1 mb-7 rounded-md border  focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder:text-xs"
                />

                <p className=" text-xs mb-1">DOB</p>
                <input
                  type="date"
                  name="dob"
                  placeholder="Dob"
                  onChange={handleChange}
                  value={formData.dob}
                  className="w-full px-3 py-1 mb-7 rounded-md border  focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder:text-xs"
                />

                <p className=" text-xs mb-1">Phone Number</p>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone number"
                  onChange={handleChange}
                  value={formData.phone}
                  className="w-full px-3 py-1 mb-7 rounded-md border  focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder:text-xs"
                />

                <p className=" text-xs mb-1">PAN no.</p>
                <input
                  type="text"
                  name="pancard"
                  placeholder="Pan no"
                  onChange={handleChange}
                  value={formData.pancard}
                  className="w-full px-3 py-1 mb-7 rounded-md border  focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder:text-xs"
                />

                <p className="text-xs mb-1">Image</p>
                <div className="flex items-center space-x-4">
                    {/* Label to trigger file input */}
                    <label htmlFor="imageUpload" className="cursor-pointer">
                      <FaUpload className="text-xl text-black" />
                    </label>
                    <input
                      id="imageUpload"
                      type="file"
                      name="image"
                      className="hidden"
                      onChange={handleChange}
                    />
                    <span>{formData.image ? formData.image.name : "No file chosen"}</span>
                  </div>
              </div>
            </div>

            {/* Update Button */}
            <button onClick={handleSubmit} className="mt-4 px-6 py-2  bg-white text-black rounded-xl shadow-md hover:bg-teal-800 hover:text-white transition duration-200">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
    </form>
  );
};

export default UpdateProfile;
