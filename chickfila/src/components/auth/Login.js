import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const responseGoogle = (response) => {
    const userObject = jwt_decode(response.credential);
    localStorage.setItem('user', JSON.stringify(userObject));
    if (userObject.given_name === "server") {
      navigate("/server");
    } else if (userObject.given_name === "manager") {
      navigate("/manager");
    } else {
        navigate("/")
    }
  };

  return (
    <div className="">
      <div className="">
        <GoogleLogin
          render={(renderProps) => (
            <button
              type="button"
              className=""
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              Login
            </button>
          )}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy="single_host_origin"
        />
      </div>
    </div>
  );
};

export default Login;
