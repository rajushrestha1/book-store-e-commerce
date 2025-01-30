import Footer from "./components/Footer"
import NavBar from "./components/NavBar"
import Home from "./pages/Home"
import{ BrowserRouter as Router, Routes, Route} from "react-router-dom"
import AllBooks from "./pages/AllBooks"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Cart from "./pages/Cart"
import Profile from "./pages/Profile"
import ViewBookSetails from "./components/views/ViewBookSetails"

const App = () => {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/all-books" element={<AllBooks />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/signin" element={<SignIn/>}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="view-book-details/:id" element={<ViewBookSetails />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App
