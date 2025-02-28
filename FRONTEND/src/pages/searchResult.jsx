import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import BookCard from "../components/BookCard";

const SearchResults = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("query");
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (query) {
            axios.get(`http://localhost:3000/book/search?query=${query}`)
                .then((res) => {
                    setBooks(res.data.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [query]);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Search Results for "{query}"</h1>
            {loading ? <p>Loading...</p> : books.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {books.map((book) => (
                        <BookCard key={book._id} data={book} />
                    ))}
                </div>
            ) : <p>No books found.</p>}
        </div>
    );
};

export default SearchResults;