import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import LanguageIcon from "@mui/icons-material/Language";
import axios from "axios";

const ViewBookSetails = () => {
  const { id } = useParams();
  const [Data, setData] = useState(null); // Default to null
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/book/get-book-by-id/${id}`);
        setData(response.data.data);
      } catch (err) {
        console.log(err)
        setError("Failed to fetch book details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]); // Add 'id' as a dependency

  console.log(id);

  // Handle loading and errors
  if (loading) return <p>Loading book details...</p>;
  if (error) return <p>{error}</p>;
  if (!Data) return <p>No book details found.</p>;

  return (
    <div className="py-8 px-12 flex gap-8">
      <div className="rounded p-4 h-screen">
        <img src={Data.url} alt={Data.title} />
      </div>
      <div className="p-4">
        <h1>{Data.title}</h1>
        <p>{Data.author}</p>
        <p>{Data.desc}</p>
        <p>
          <LanguageIcon />
          {Data.language}
        </p>
        <p>Price: $ {Data.price}</p>
      </div>
    </div>
  );
};

export default ViewBookSetails;
