import Hero from "../components/Hero"
import RecentlyAdded from "../components/RecentlyAdded"
import Carosole from "../components/carosole"

const Home = () => {
  return (
    <div className=" ">
      <Carosole />
      <Hero />
      <RecentlyAdded />
    </div>
  )
}

export default Home
