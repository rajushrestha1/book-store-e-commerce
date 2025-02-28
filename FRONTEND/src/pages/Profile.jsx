import { useEffect, useState } from "react";
import Sidebar from "../components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import MobileNav from "../components/Profile/MobileNav";
const API_BASE_URL = "https://legendary-books-backend.vercel.app";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const headers = {
          id: localStorage.getItem("id") || "",
          authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        };

        const response = await axios.get(
          API_BASE_URL+"/user/user-info",
          { headers }
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, []); // ✅ Run only once when the component mounts

  return (
    <div className="px-2 md:px-12 flex flex-col md:flex-row py-8 gap-4">
      {!profile ? (
        <div className="w-full h-[100vh] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
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