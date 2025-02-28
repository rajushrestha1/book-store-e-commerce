import axios from "axios";
import { useState } from "react";
import { API_BASE_URL } from "../utility/config";

const CarouselManager = () => {
  const [slide, setSlide] = useState({
    title: "",
    image: "",
    link: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSlide({ ...slide, [name]: value });
  };

  const submit = async () => {
    try {
      if (!slide.title || !slide.image) {
        alert("Title and Image URL are required");
        return;
      }

      const response = await axios.post(API_BASE_URL+"/home/add-carousel-slider", slide);
      setSlide({
        title: "",
        image: "",
        link: ""
      });
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="h-[100%] p-0 md:p-4">
      <h1 className="text-3xl md:text-5xl font-semibold mb-8">Add Carousel Slide</h1>
      <div className="p-4 rounded">
        <div>
          <label className="">Title</label>
          <input
            type="text"
            className="w-full mt-2 p-2"
            placeholder="Slide title"
            name="title"
            required
            value={slide.title}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label className="">Image URL</label>
          <input
            type="text"
            className="w-full mt-2 p-2"
            placeholder="Image URL"
            name="image"
            required
            value={slide.image}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label className="">Link</label>
          <input
            type="text"
            className="w-full mt-2 p-2"
            placeholder="Slide link (optional)"
            name="link"
            value={slide.link}
            onChange={handleChange}
          />
        </div>
        <button
          className="mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300"
          onClick={submit}
        >
          Add Slide
        </button>
      </div>
    </div>
  );
};

export default CarouselManager;
