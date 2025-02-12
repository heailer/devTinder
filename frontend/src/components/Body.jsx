import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import BASE_URL from "../utils/constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      navigate("/login");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
