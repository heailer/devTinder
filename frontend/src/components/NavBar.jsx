import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import axios from "axios";
import { removeConnections } from "../utils/connectionsSlice";
import { removeAllFeed, removeFeed } from "../utils/feedSlice";
import { removeRequest } from "../utils/requestSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user || null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/logout",
        {},
        {
          withCredentials: true,
        }
      );
      console.log(res);
      dispatch(removeUser());
      window.location.replace("http://13.61.10.57/login");
    } catch (err) {}
  };

  return (
    <>
      <div className="navbar bg-base-300">
        <div className="flex-1">
          {user && (
            <Link to={"/"} className="btn btn-ghost text-xl">
              devTinder
            </Link>
          )}
          {!user && (
            <Link to={"/login"} className="btn btn-ghost text-xl">
              devTinder
            </Link>
          )}
        </div>
        <div className="flex-none gap-2">
          <div className="form-control"></div>
          {user && (
            <div className="flex items-center">
              <p>Welcome, {user.firstName}</p>
              <div className="dropdown dropdown-end mx-5">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={user.photoUrl}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <Link to={"/"} className="justify-between">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to={"/profile"} className="justify-between">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to={"/connections"}>Connections</Link>
                  </li>
                  <li>
                    <Link to={"/requests"}>Requests</Link>
                  </li>
                  <li>
                    <a onClick={handleLogOut}>Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
