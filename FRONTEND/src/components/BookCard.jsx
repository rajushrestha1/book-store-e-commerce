import { Link } from "react-router-dom";

const BookCard = ({ data }) => {
  // Directly destructure the data object to make sure all fields are present
  const { _id, url, title, author, price } = data;

  // If any of the required fields are missing, log an error and don't render
  if (!_id || !url || !title || !author || !price) {
    console.error("Missing required fields in book data", data);
    return null; // Don't render the component if data is incomplete
  }

  return (
    <div>
      <Link to={`/view-book-details/${_id}`}>
        <div className="bg-zinc-900 rounded flex items-center justify-center">
          <img 
            src={url} 
            alt={title} 
            className="h-[25vh] object-cover" 
          />
        </div>
        <h2 className="mt-4 text-xl text-white font-semibold">
          {title}
        </h2>
        <p className="mt-2 text-zinc-400 font-semibold">
          by {author}
        </p>
        <p className="mt-2 text-zinc-200 font-semibold text-xl">
          &#8377; {price}
        </p>
      </Link>
    </div>
  );
};

export default BookCard;
