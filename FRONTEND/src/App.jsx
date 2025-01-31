import Footer from "./components/Footer"
import NavBar from "./components/NavBar"
import Home from "./pages/Home"
import{  Routes, Route} from "react-router-dom"
import AllBooks from "./pages/AllBooks"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Cart from "./pages/Cart"
import Profile from "./pages/Profile"
import ViewBookSetails from "./components/views/ViewBookSetails"
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";
import { useEffect } from "react"
const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, [role]);
  return (
    <div>
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
      
    </div>
  )
}

export default App
