import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const user = useSelector((store) => store.user);
  console.log(user);
  return (
    user && (
      <>
        <div className="flex">
          <div className="bg-base-300 shadow-xl m-3 h-[500px] w-1/2 rounded-lg">
            <div className="flex justify-center m-2">
              <img
                src={user?.photoUrl}
                alt="user Photo"
                className="rounded-full"
                width={250}
                height={150}
              ></img>
            </div>
            <div className="flex justify-center">
              <h1 className="font-bold text-3xl text-primary">
                {user?.firstName + " " + user?.lastName}
              </h1>
            </div>
            <div className="flex justify-center text-secondary">
              <h2 className="font-bold text-2xl">{user?.occupation}</h2>
            </div>
            <div className="w-1/2 m-auto p-4 h-40 rounded-lg text-xl">
              <p>
                <span className="text-white">Age:</span> {user?.age}
              </p>
              <p>
                <span className="text-white">Gender:</span> {user?.gender}
              </p>
              <p>
                <span className="text-white">Location: </span>
                {user?.location}
              </p>
            </div>
          </div>
          <div className="w-1/2">
            <div className="bg-base-300 shadow-xl m-3 h-[242px] rounded-lg p-2">
              <h1 className="text-white m-3 text-2xl">About Me</h1>
              <p className="m-4">{user?.about}</p>
            </div>
            <div className="bg-base-300 shadow-xl m-3 h-[245px] rounded-lg p-4">
              <h1 className="text-white m-3 text-2xl">Skills</h1>
              <ul className="m-3">
                {user?.skills.map((element, index) => (
                  <li key={index}>{element}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div>
          <Link to={"/editProfile"}>
            <button className="mx-6 bg-base-300 text-secondary border-black rounded-lg text-xl p-4 m-2">
              Edit
            </button>
          </Link>
        </div>
      </>
    )
  );
};
export default Profile;
