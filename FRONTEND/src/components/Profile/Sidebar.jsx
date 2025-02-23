import { Link, useNavigate } from "react-router-dom";
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { authActions } from "../../store/auth";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = ({ data }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const role = useSelector((state) => state.auth.role);
  return (
    <div className=" p-4 rounded flex flex-col items-center justify-between h-auto lg:h-[100%]">
      <div className="flex items-center flex-col justify-center">
        <img src={data.avatar} className="h-[12vh]" />
        <p className="mt-3 text-xl  font-semibold">
          {data.username}
        </p>
        <p className="mt-1 text-normal ">{data.email}</p>
        <div className="w-full mt-4 h-[1px]  hidden lg:block"></div>
      </div>

      {role === "user" && (
        <div className="w-full flex-col items-center justify-center hidden lg:flex">
          <Link
            to="/profile"
            className=" font-semibold w-full py-2 text-center hover:bg-blue-600 rounded transition-all duration-300"
          >
            Favourites
          </Link>
          <Link
            to="/profile/orderHistory"
            className=" font-semibold w-full py-2 mt-4 text-center hover:bg-blue-600 rounded transition-all duration-300"
          >
            Order History
          </Link>
          <Link
            to="/profile/settings"
            className=" font-semibold w-full py-2 mt-4 text-center hover:bg-blue-600 rounded transition-all duration-300"
          >
            Settings
          </Link>
        </div>
      )}

      {role === "admin" && (
        <div className="w-full flex-col items-center justify-center hidden lg:flex">
          <Link
            to="/profile"
            className=" font-semibold w-full py-2 text-center hover:bg-blue-600 rounded transition-all duration-300"
          >
            All Orders
          </Link>
          <Link
            to="/profile/add-book"
            className=" font-semibold w-full py-2 mt-4 text-center hover:bg-blue-600 rounded transition-all duration-300"
          >
            Add Book
          </Link>
        </div>
      )}
      <button
        className="mt-4 w-full font-poppins py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
        onClick={() => {
          dispatch(authActions.logout());
          dispatch(authActions.changeRole("user"));
          localStorage.clear("id");
          localStorage.clear("token");
          localStorage.clear("role");
          history("/");
        }}
      >
        Log Out <SubdirectoryArrowRightIcon className="ms-4" />
      </button>
    </div>
  );
};

export default Sidebar;