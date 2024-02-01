import { NavLink, useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  const userJSON = localStorage.getItem("user");
  const user = JSON.parse(userJSON);
  const userId = user?.userId;
  const username = user?.username;

  async function onLogout() {
    // delete server session
    await fetch("https://node-social-nbqx.onrender.com/logout/");
    // delete local storage
    localStorage.removeItem("user");
    window.location.replace("/");
  }
  return (
    <div
      id="navBar"
      className="d-flex justify-content-between align-items-center p-2"
    >
      <div className="fs-4 text-white border px-2">MessageNode</div>
      <div>
        {!user && (
          <div className="d-flex gap-4 me-3">
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Signup
            </NavLink>
          </div>
        )}
        {user && (
          <div className="d-flex gap-4 me-3">
            <div className="text-warning">Hi {username}</div>
            <button
              className="bg-transparent border-0 text-white"
              onClick={onLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
