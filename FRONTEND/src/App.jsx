import { useEffect } from "react";
import Home from "./pages/Home";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import AllBooks from "./pages/AllBooks";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ViewBookSetails from "./components/views/ViewBookSetails";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";
import Favourites from "./components/Profile/Favourites";
import UserOrderHistory from "./components/Profile/UserOrderHistory";
import Settings from "./components/Profile/Settings";
import AllOrders from "./pages/AllOrders";
import AddBook from "./pages/AddBook";
import UpdateBook from "./pages/UpdateBook";

import PaymentComponent from "./utility/PaymentComponent";
import verifyPayment from "./utility/verifyPayment";
import PaymentSuccess from "./pages/paymentSuccess";
import AddAuthor from "./pages/addAuthor";
import CarouselManager from "./pages/carosouelManager";
import SearchBar from "./components/searchBar";
import SearchResults from "./pages/searchResult";
import GenreBooks from "./pages/GenreBooks";
import AuthorBooks from "./pages/AuthorBooks";

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      const roleFromLocalStorage = localStorage.getItem("role");
      dispatch(authActions.login());
      dispatch(authActions.changeRole(roleFromLocalStorage));
    }
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/cart" element={<Cart />} />

        {/* Use a single profile route that handles both user and admin */}
        <Route path="/profile" element={<Profile />}>
          <Route
            index
            element={role === "admin" ? <AllOrders /> : <Favourites />}
          />

          {/* Admin-only routes */}
          {role === "admin" && (
            <>
              <Route path="add-book" element={<AddBook />} />
              <Route path="add-author" element={<AddAuthor />} />
              <Route path="carousel-manager" element={<CarouselManager />} />
            </>
          )}

          {/* Routes available to all users */}
          <Route path="orderHistory" element={<UserOrderHistory />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/updateBook/:id" element={<UpdateBook />} />
        <Route path="/view-book-details/:id" element={<ViewBookSetails />} />
        <Route path="/payment-component" element={<PaymentComponent />} />
        <Route path="/verify-payment" element={<verifyPayment />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/add-author" element={<AddAuthor />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/genre/:genre" element={<GenreBooks />} />
        <Route path="/author/:authorId" element={<AuthorBooks />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
