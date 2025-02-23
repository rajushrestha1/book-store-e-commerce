import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
    const [carouselItems, setCarouselItems] = useState([]);

    // Fetch carousel data from API
    useEffect(() => {
        const fetchCarouselItems = async () => {
            try {
                const response = await axios.get("http://localhost:3000/home/get-carousel-slides");
                setCarouselItems(response.data);
            } catch (error) {
                console.error("Error fetching carousel items:", error);
            }
        };
        fetchCarouselItems();
    }, []);

    // Slider Settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 3, // Show 3 slides at once
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500, // Rotate every 2.5 seconds
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className="w-full px-4 py-8">
            {carouselItems.length > 0 ? (
                <Slider {...settings}>
                    {carouselItems.map((item) => (
                        <div key={item.id} className="relative px-2">
                            <div className="w-[450px] h-[300px] mx-auto  overflow-hidden rounded-lg shadow-md">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                           
                        </div>
                    ))}
                </Slider>
            ) : (
                <div className="h-96 bg-gray-300 flex items-center justify-center">
                    <p className="text-2xl">Loading...</p>
                </div>
            )}
        </div>
    );
};

export default Carousel;