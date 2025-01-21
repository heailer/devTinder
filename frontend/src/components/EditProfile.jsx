import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BASE_URL from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const user = useSelector((store) => store.user);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [occupation, setOccupation] = useState(user?.occupation || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [location, setLocation] = useState(user?.location || "");
  const [aboutMe, setAboutMe] = useState(user?.about || "");
  const [skills, setSkills] = useState(user?.skills || []);
  const [successMessage, setSuccessMessage] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSaveProfile = async () => {
    try {
      const user = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          photoUrl,
          firstName,
          lastName,
          occupation,
          age: parseInt(age),
          gender,
          location,
          about: aboutMe,
          skills,
        },
        { withCredentials: true }
      );
      dispatch(addUser(user?.data));
      setSuccessMessage(true);
      setTimeout(() => {
        setSuccessMessage(false);
        navigate("/profile");
      }, 1000);
    } catch (err) {
      console.log(err);
      setError(err?.response?.data);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="bg-base-300 w-1/3 mx-auto m-4 rounded-lg p-2">
      <h1 className="font-bold text-3xl px-40 py-4">Edit Profile</h1>
      <label className="form-control w-full max-w-xs m-auto">
        <div className="label">
          <span className="label-text">Photo Url</span>
        </div>
        <input
          type="text"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
      </label>
      <label className="form-control w-full max-w-xs m-auto">
        <div className="label">
          <span className="label-text">First Name</span>
        </div>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
      </label>
      <label className="form-control w-full max-w-xs m-auto">
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
      <label className="form-control w-full max-w-xs m-auto">
        <div className="label">
          <span className="label-text">Occupation</span>
        </div>
        <input
          type="text"
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
      </label>
      <label className="form-control w-full max-w-xs m-auto">
        <div className="label">
          <span className="label-text">Age</span>
        </div>
        <input
          type="text"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
      </label>
      <label className="form-control w-full max-w-xs flex mx-20">
        <div className="label">
          <span className="label-text">Gender</span>
        </div>
        <select
          className="select select-bordered"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="" disabled>
            Choose One
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Others">Others</option>
        </select>
      </label>
      {successMessage && (
        <div>
          <div
            role="alert"
            className="alert alert-success fixed top-0 flex justify-center left-1/2 transform -translate-x-1/2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Profile Updated Succesfully</span>
          </div>
        </div>
      )}
      <label className="form-control w-full max-w-xs m-auto">
        <div className="label">
          <span className="label-text">Location</span>
        </div>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
      </label>
      <div className="flex justify-center">
        <label>
          <div className="m-1">
            <span>About Me</span>
          </div>
          <textarea
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
            className="w-80 h-80 input input-bordered"
          />
        </label>
      </div>
      <label className="form-control w-full max-w-xs m-auto my-2">
        <div className="label">
          <span className="label-text">Skills</span>
        </div>
        <input
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value.split(","))}
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
      </label>
      <button
        onClick={handleSaveProfile}
        className="border-blue-500 border-2 bg-primary text-black rounded-lg p-2 mx-44 my-2"
      >
        Save Profile
      </button>
      <p className="text-red-700 text-center font-bold text-xl">{error}</p>
    </div>
  );
};

export default EditProfile;
