
const NavBar = () => {
    const links=[
        {
        title :"Home",
        link:"/",
        },
        {
            title :"About Us",
            link:"/about-us",
            },
            {
                title :"All Books",
                link:"/all-books",
                },
                {
                    title :"Cart",
                    link:"/cart",
                    },
                    {
                        title :"Profile",
                        link:"/profile",
                        },
    ]
  return (
    <div className="flex bg-zinc-800 text-white px-8 py-4 items-center justify-between">
      <div className="flex items-center">
        <img src="" />
        <h1 className="text-2xl font-bold">Book Pasal</h1>
      </div>
      <div className="nav-links-bookpasal">
       <div className="flex gap-4">
       {links.map((items,i)=>(
            <div className="hover:text-blue-500 cursor-pointer"
            key={i}>{items.title}</div>
        ))}
       </div>
       <div>
        <button className="px-4 py-2 border-blue-500 rounded hover:bg-white hover:text-black">SignIn</button>
        <button className="px-4 py-2 border-blue-500 rounded hover:bg-white hover:text-black">SignUp</button>
       </div>
      </div>
    </div>
  )
}

export default NavBar
