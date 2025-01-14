import { useEffect } from "react";
import axios from "axios"; // Make sure to import axios
import BASE_URL from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.feed);
  //console.log(data?.users[0]?.photoUrl);

  const fetchUserFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
      //console.log(res.data);
    } catch (err) {
      console.error("Error fetching user feed:", err.message);
    }
  };

  useEffect(() => {
    fetchUserFeed();
  }, []);

  return (
    data && (
      <div className="flex justify-center my-10">
        <UserCard user={data ? data?.users[0] : null} />
      </div>
    )
  );
};

export default Feed;
