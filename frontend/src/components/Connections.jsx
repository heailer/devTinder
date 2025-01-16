import axios from "axios";
import BASE_URL from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";
import UserCard2 from "./UserCard2";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0)
    return (
      <div className="text-center font-bold text-3xl p-4">
        <h1>No Connections found</h1>
      </div>
    );

  return (
    <div>
      <h1 className="text-center font-bold text-3xl text-primary">
        Connections
      </h1>
      <div className="flex flex-wrap">
        {connections.map((connection) => {
          return (
            <div className="m-3" key={connection._id}>
              <UserCard2 user={connection} connectionsCard={true} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
