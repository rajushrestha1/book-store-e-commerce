import axios from "axios";
import { useState } from "react";
import { API_BASE_URL } from "../utility/config";
const AddAuthor = () => {
  const [author, setAuthor] = useState({
    name: "",
    bio: "",
    profileImage: "",
    socialLinks: { website: "", twitter: "", instagram: "" },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("socialLinks.")) {
      const key = name.split(".")[1]; // Extract website, twitter, instagram
      setAuthor({ ...author, socialLinks: { ...author.socialLinks, [key]: value } });
    } else {
      setAuthor({ ...author, [name]: value });
    }
  };

  const submit = async () => {
    try {
      if (!author.name) {
        alert("Author name is required");
        return;
      }

      const response = await axios.post(API_BASE_URL +"/author/add-author", author);
      setAuthor({
        name: "",
        bio: "",
        profileImage: "",
        socialLinks: { website: "", twitter: "", instagram: "" },
      });
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="h-[100%] p-0 md:p-4">
      <h1 className="text-3xl md:text-5xl font-semibold  mb-8">
        Add Author
      </h1>
      <div className="p-4  rounded">
        <div>
          <label className="">Name</label>
          <input
            type="text"
            className="w-full mt-2  p-2 "
            placeholder="Author name"
            name="name"
            required
            value={author.name}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label className=" ">Bio</label>
          <textarea
            className="w-full mt-2 p-2"
            placeholder="Short biography"
            name="bio"
            value={author.bio}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label className=" ">Profile Image URL</label>
          <input
            type="text"
            className="w-full mt-2 p-2"
            placeholder="Profile image URL"
            name="profileImage"
            value={author.profileImage}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label className=" ">Website</label>
          <input
            type="text"
            className="w-full mt-2 p-2"
            placeholder="Website URL"
            name="socialLinks.website"
            value={author.socialLinks.website}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label className=" ">Twitter</label>
          <input
            type="text"
            className="w-full mt-2 p-2"
            placeholder="Twitter handle"
            name="socialLinks.twitter"
            value={author.socialLinks.twitter}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label className=" ">Instagram</label>
          <input
            type="text"
            className="w-full mt-2 p-2"
            placeholder="Instagram handle"
            name="socialLinks.instagram"
            value={author.socialLinks.instagram}
            onChange={handleChange}
          />
        </div>
        <button
          className="mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300"
          onClick={submit}
        >
          Add Author
        </button>
      </div>
    </div>
  );
};

export default AddAuthor;