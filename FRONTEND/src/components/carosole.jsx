import { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const API_BASE_URL = "https://legendary-books-backend.vercel.app";

const CarouselComponent = () => {
    const [carouselItems, setCarouselItems] = useState([]);

    // Fetch carousel data from API
    useEffect(() => {
        const fetchCarouselItems = async () => {
            try {
                const response = await axios.get(API_BASE_URL+"/home/get-carousel-slides");
                setCarouselItems(response.data);
            } catch (error) {
                console.error("Error fetching carousel items:", error);
            }
        };
        fetchCarouselItems();
    }, []);

    const responsive = {
        desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3, slidesToSlide: 3 },
        tablet: { breakpoint: { max: 1024, min: 464 }, items: 2, slidesToSlide: 2 },
        mobile: { breakpoint: { max: 464, min: 0 }, items: 1, slidesToSlide: 1 }
    };

    return (
        <div className="w-full px-4 py-8">
            {carouselItems.length > 0 ? (
                <Carousel
                    swipeable={true}
                    draggable={true}
                    showDots={true}
                    responsive={responsive}
                    infinite={true}
                    autoPlay={window.innerWidth > 768}
                    autoPlaySpeed={3000}
                    keyBoardControl={true}
                    customTransition="all .5s"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                >
                    {carouselItems.map((item) => (
                        <div key={item._id} className="relative w-[450px] h-[300px] px-2">
                            <div className="w-[450px] h-[300px] mx-auto overflow-hidden rounded-lg shadow-md">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                            </div>
                        </div>
                    ))}
                </Carousel>
            ) : (
                <div className="h-96 bg-gray-300 flex items-center justify-center">
                    <p className="text-2xl">Loading...</p>
                </div>
            )}
        </div>
    );
};

export default CarouselComponent;