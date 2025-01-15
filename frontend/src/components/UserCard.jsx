const UserCard = ({ user, connectionsCard, requestCard, handleRequests }) => {
  return user ? (
    <div className="card bg-base-300 w-96 h-[852px] shadow-xl">
      <figure>
        <div className="rounded-lg">
          <img
            src={user?.fromUserId?.photoUrl}
            alt="userPhoto"
            className="p-4 m-2 rounded-md"
            width={250}
            height={150}
          />
        </div>
      </figure>
      <div className="card-body">
        <h1 className="card-title justify-center font-bold text-2xl">
          {user?.fromUserId?.firstName + " " + user?.fromUserId?.lastName}
        </h1>
        <h2 className="card-title justify-center text-xl">
          {user?.fromUserId?.occupation}
        </h2>

        <p>
          <span className="font-bold text-xl">About:</span>{" "}
          {user?.fromUserId?.about}
        </p>
        <p>
          <span className="font-bold text-xl">Skills:</span>{" "}
          {user?.fromUserId?.skills.join(", ")}
        </p>
        {!connectionsCard && (
          <div className="card-actions my-4">
            <button
              className="btn btn-primary mx-6"
              onClick={() => handleRequests("rejected", user._id)}
            >
              {requestCard === true ? "Reject" : "Ignore"}
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleRequests("accepted", user._id)}
            >
              {requestCard === true ? "Accept" : "Intrested"}
            </button>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div>No feed available at this moment</div>
  );
};

export default UserCard;
