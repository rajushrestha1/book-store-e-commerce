import Hero from "../components/Hero"
import RecentlyAdded from "../components/RecentlyAdded"

const Home = () => {
  return (
    <div className=" bg-zinc-500 px-10 py-8 ">
      <Hero />
      <RecentlyAdded />
    </div>
  )
}

export default Home
