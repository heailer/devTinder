import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../utils/constants";

const LogIn = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState();
  const [isLogIn, setIsLogIn] = useState(true);
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
      setError(err?.response?.data);
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };
  const onClickSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signUp",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      navigate("/editProfile");
    } catch (err) {
      if (err.status === 400) {
        console.log("A Bad Request Was Made, Please Check Your Inputs");
      }
      const errSignUp = err?.response?.data;
      setError(errSignUp);
      setTimeout(() => {
        setError("");
      }, 15000);
    }
  };

  return (
    <div className="flex justify-center my-12">
      <div
        className={`card bg-base-300 w-96 shadow-xl ${
          isLogIn ? "h-[480px]" : "h-[580px]"
        }`}
      >
        <div className="card-body">
          <h2 className="card-title mx-auto text-3xl text-white">
            {isLogIn ? "Login" : "SignUp"}
          </h2>
          {!isLogIn && (
            <>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">First Name</span>
                </div>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Last Name</span>
                </div>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </>
          )}
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
          <button
            onClick={() => {
              setFirstName("");
              setLastName("");
              setEmailId("");
              setPassword("");
              setIsLogIn((val) => !val);
            }}
          >
            {isLogIn ? "New User? SignUP here" : "Existing User? Login here"}
          </button>
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary mx-auto my-10"
              onClick={isLogIn ? onClickLogin : onClickSignUp}
            >
              {isLogIn ? "Login" : "SignUp"}
            </button>
          </div>
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
