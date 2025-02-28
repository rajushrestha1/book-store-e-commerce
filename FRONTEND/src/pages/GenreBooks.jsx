import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookCard from "../components/BookCard";
import { API_BASE_URL } from "../utility/config";

const GenreBooks = () => {
    const { genre } = useParams();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(API_BASE_URL+`/book/books-by-genre/${genre}`)
            .then((res) => {
                setBooks(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [genre]);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Books in {genre}</h1>
            {loading ? <p>Loading...</p> : books.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {books.map((book) => (
                          <BookCard key={book._id} data={book} />
                    ))}
                </div>
            ) : <p>No books found for this genre.</p>}
        </div>
    );
};

export default GenreBooks;