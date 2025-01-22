import { useEffect, useState } from "react"
import axios from "axios"
import BookCard from "./BookCard";
const RecentlyAdded = () => {
  const[Data, setData] =  useState();
  useEffect(()=>{
    const fetch = async()=>{
     const response =  await axios.get("http://localhost:3000/book/recent-book");
   setData(response.data.data)
    }
    fetch();
  },[])
  return (
    <div className="mt-8 px-4">
        <h4 className="font-bold">Recently Added Books</h4>
        <div className="my-4 grid grid-cols-1 sm:grid-cols-3 gap-4 md:grid-cols-4">
        {Data && Data.map((items,i)=>{
            <div key={i}>
                <BookCard data={items} />
            </div>
        })}
        </div>
      
    </div>
  )
}

export default RecentlyAdded
