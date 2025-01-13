import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../utils/constants";

const LogIn = () => {
  const [emailId, setEmailId] = useState("heythisisamog@gmail.com");
  const [password, setPassword] = useState("Bot@12345");
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClickLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="flex justify-center my-12">
      <div className="card bg-base-300 w-96 shadow-xl h-[410px]">
        <div className="card-body">
          <h2 className="card-title mx-auto text-3xl text-white">Login</h2>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">EmailId</span>
            </div>
            <input
              type="text"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          <div className="card-actions justify-end">
            <button
              className="btn btn-primary mx-auto my-2"
              onClick={onClickLogin}
            >
              LogIn
            </button>
          </div>
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
