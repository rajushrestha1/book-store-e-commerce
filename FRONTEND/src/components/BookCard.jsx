import { Link } from "react-router-dom";

const BookCard = ({ data }) => {

  return (
    <div>
      <Link to={`/view-book-details/${data._id}`}>
        <div className="bg-zinc-900 rounded flex items-center justify-center">
          <img 
            src={data.url} 
            alt={data.title} 
            className="h-[25vh] object-cover" 
          />
        </div>
        <h2 className="mt-4 text-xl text-white font-semibold">
          {data.title}
        </h2>
        <p className="mt-2 text-zinc-400 font-semibold">
          by {data.author}
        </p>
        <p className="mt-2 text-zinc-200 font-semibold text-xl">
          &#8377; {data.price}
        </p>
      </Link>
    </div>
  );
};

export default BookCard;
