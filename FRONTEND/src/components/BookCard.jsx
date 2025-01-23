import { Link } from "react-router-dom"


const BookCard = (data) => {
    console.log(data)
  return (
    <>
      <Link to="/">
      <div>
        <div>
          <img src={data.url} alt="/" />
          </div>
          <h2>{data.title}</h2>
          </div>
          </Link>
    </>
  )
}

export default BookCard

