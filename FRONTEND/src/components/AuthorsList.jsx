import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API_BASE_URL = "https://legendary-books-backend.vercel.app";

const AuthorsList = () => {
    const [authors, setAuthors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(API_BASE_URL+"/author/list") // Adjust API URL as needed
            .then((res) => setAuthors(res.data.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-2">Authors</h1>
            <p className="text-gray-600 mb-4">Discover books by your favorite authors.</p>

            {/* Scrollable Author List */}
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide p-2">
                {authors.map((author) => (
                    <button
                        key={author._id}
                        className="flex flex-col items-center space-y-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all"
                        onClick={() => navigate(`/author/${author._id}`)}
                    >
                        <img
                            src={author.profileImage || "https://example.com/default-profile.png"}
                            alt={author.name}
                            className="w-16 h-16 object-cover rounded-full"
                        />
                        <span className="text-sm font-medium text-center">{author.name}</span>
                        <span className="text-xs text-gray-500">{author.followerCount} followers</span>
                    </button>
                ))}
            </div>
        </div>
    );
};





export default AuthorsList;