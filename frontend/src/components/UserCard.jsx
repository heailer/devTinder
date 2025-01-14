const UserCard = ({ user, connectionsCard }) => {
  return user ? (
    <div className="card bg-base-300 w-96 h-[752px] shadow-xl">
      <figure>
        <img
          src={user.photoUrl}
          alt="userPhoto"
          className="p-4 rounded-md"
          width={250}
          height={150}
        />
      </figure>
      <div className="card-body">
        <h1 className="card-title justify-center font-bold text-2xl">
          {user.firstName + " " + user.lastName}
        </h1>
        <h2 className="card-title justify-center text-xl">{user.occupation}</h2>

        <p>
          <span className="font-bold text-xl">About:</span> {user.about}
        </p>
        <p>
          <span className="font-bold text-xl">Skills:</span>{" "}
          {user.skills.join(", ")}
        </p>
        {!connectionsCard && (
          <div className="card-actions justify-center my-4">
            <button className="btn btn-primary mx-2">Ignore</button>
            <button className="btn btn-secondary">Intrested</button>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div>No feed available at this moment</div>
  );
};

export default UserCard;
