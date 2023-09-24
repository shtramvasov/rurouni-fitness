import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const { isAuth } = useSelector(state => state.userSlice)

  useEffect(() => {
    if (!isAuth) {
      navigate("/login", { replace: true });
    }
  }, [isAuth]);

  return isAuth ? <Outlet/> : null;
};

export default PrivateRoute;