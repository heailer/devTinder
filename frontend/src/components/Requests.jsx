import axios from "axios";
import BASE_URL from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import UserCard from "./UserCard";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);
  console.log(requests);
  const handleRequests = async (Status, id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + Status + "/" + id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(id));
    } catch (err) {
      console.log(err.message);
    }
  };
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/pendingRequests", {
        withCredentials: true,
      });
      console.log(res.data.pendingConnections);
      dispatch(addRequests(res.data.pendingConnections));
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);
  if (!requests) return;
  if (requests.length === 0)
    return (
      <div>
        <h1>No Requests found</h1>
      </div>
    );

  return (
    <div>
      <h1 className="text-center font-bold text-3xl text-primary">Requests</h1>
      <div className="flex flex-wrap">
        {requests.map((request) => {
          return (
            <div className="m-3" key={request?.fromUserId._id}>
              <UserCard
                user={request}
                connectionsCard={false}
                requestCard={true}
                handleRequests={handleRequests}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
