import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
 import BookCard from "../components/BookCard";
 const API_BASE_URL = "https://legendary-books-backend.vercel.app";

const AuthorBooks = () => {
    const { authorId } = useParams();
    const [author, setAuthor] = useState(null);
    const [books, setBooks] = useState([]); // Ensure books is initialized as an empty array
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true); // Start loading
        axios.get(API_BASE_URL+`/author/${authorId}`)
        .then((res) => {
            console.log("API Response:", res.data); // Debugging log
            setAuthor(res.data.data.author);    // ✅ Author object
            setBooks(res.data.data.books); // ✅ Books array inside author
        })
        .catch((err) => console.error(err))
            .finally(() => setLoading(false)); // Stop loading
    }, [authorId]);

    if (loading) return <p>Loading...</p>;
    if (!author) return <p className="text-red-500">Author not found</p>;

    return (
        <div className="p-6">
            <div className="flex items-center space-x-4">
                <img src={author.profileImage} alt={author.name} className="w-20 h-20 rounded-full" />
                <div>
                    <h1 className="text-2xl font-bold">{author.name}</h1>
                    <p className="text-gray-600">{author.bio}</p>
                </div>
            </div>

            <h2 className="text-xl font-semibold mt-6">Books by {author.name}</h2>
            {books.length > 0 ? (
                <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {books.map((book) => (
                    <BookCard key={book._id} data={book} />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No books found for this author.</p>
            )}
        </div>
    );
};

export default AuthorBooks;