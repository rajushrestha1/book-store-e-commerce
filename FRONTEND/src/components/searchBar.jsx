import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        if (query.trim()) {
            navigate(`/search?query=${query}`);
        }
    };

    return (
        <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <input
                type="text"
                className="w-full p-2 outline-none"
                placeholder="Search books, authors..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <button onClick={handleSearch} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg">
                Search
            </button>
        </div>
    );
};

export default SearchBar;