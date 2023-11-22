import useAuth from "../../../Hooks/useAuth";

const UserHome = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2 className="text-3xl">
        Hi, Welcome <span>{user?.displayName ? user.displayName : "Back"}</span>
      </h2>
    </div>
  );
};

export default UserHome;
