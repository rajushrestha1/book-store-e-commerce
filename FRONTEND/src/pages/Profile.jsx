import { useEffect, useState } from "react";
import Sidebar from "../components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import MobileNav from "../components/Profile/MobileNav";

const Profile = () => {
  const [profile, setProfile] = useState();

  const headers = {
    id: localStorage.getItem("id") || "",
    authorization: `Bearer ${localStorage.getItem("token") || ""}`,
  };

 // Remove headers from dependencies and fetch inside useEffect
useEffect(() => {
  const fetchProfile = async () => {
    const headers = {
      id: localStorage.getItem("id") || "",
      authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    };
    try {
      const response = await axios.get(
        "http://localhost:3000/user/user-info",
        { headers }
      );
      setProfile(response.data);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };
  fetchProfile();
}, [headers]); // Empty dependency array to run once

  return (
    <div className=" px-2 md:px-12 flex flex-col md:flex-row py-8 gap-4 ">
      {!profile && (
        <div className="w-full h-[100vh] flex items-center justify-center">
          <Loader />
        </div>
      )}
      {profile && (
        <>
          <div className="w-full md:w-1/6 h-auto lg:h-screen">
            <Sidebar data={profile} />
            <MobileNav />
          </div>
          <div className="w-full md:w-5/6">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;