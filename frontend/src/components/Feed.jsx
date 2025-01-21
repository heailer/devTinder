import { useEffect } from "react";
import axios from "axios"; // Make sure to import axios
import BASE_URL from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeFeed } from "../utils/feedSlice";
import UserCard2 from "./UserCard2";

const Feed = () => {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.feed);
  const handleFeed = async (Status, id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + Status + "/" + id,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(id));
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchUserFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.users));
    } catch (err) {
      console.error("Error fetching user feed:", err.message);
    }
  };

  useEffect(() => {
    fetchUserFeed();
  }, []);

  return data && data.length !== 0 ? (
    <div className="flex justify-center my-10">
      <UserCard2
        user={data[0]}
        connectionsCard={false}
        handleFeed={handleFeed}
      />
    </div>
  ) : (
    <div className="text-center font-bold text-3xl p-4 mb-96 mt-64">
      <h1>No feed available at this moment</h1>
    </div>
  );
};

export default Feed;
