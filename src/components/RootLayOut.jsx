import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

const RootLayOut = () => {
  return (
    <div className="container">
      <Navigation />
      <Outlet />
    </div>
  );
};

export default RootLayOut;
