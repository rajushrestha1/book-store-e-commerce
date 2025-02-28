import axios from "axios";
import  { useEffect, useState } from "react";
import BookCard from "../BookCard";
import { API_BASE_URL } from "../utility/config";

const Favourites = () => {
  const [FavouriteBooks, setFavouriteBooks] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          API_BASE_URL +"/favourite/user-favourite",
          { headers }
        );
        setFavouriteBooks(response.data.data);
      } catch (error) {
        console.error("Error fetching favourite books:", error);
      }
    };
    fetch();
  }, []); // ✅ Empty dependency array

  return (
    <>
      {FavouriteBooks && FavouriteBooks.length === 0 && (
        <div className="w-full h-[600px] flex items-center justify-center bg-cover bg-center px-6 lg:px-16">
          No Favourite Books
          <img src="https://img.freepik.com/free-vector/woman-saying-no-concept-illustration_114360-19594.jpg?t=st=1740726593~exp=1740730193~hmac=d29b2ee3d3c92727b4329642f226eee7a22830cca376d19ee70f9a09f2097485&w=1480" alt="star" className="h-[200px] my-8" />
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {FavouriteBooks &&
          FavouriteBooks.map((items, i) => (
            <div key={i}>
              <BookCard data={items} favourite={true} />
            </div>
          ))}
      </div>
    </>
  );
};

export default Favourites;