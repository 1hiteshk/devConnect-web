import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

type Props = {};

const Login = (props: Props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState<any>("hitu@gmail.com");
  const [password, setPassword] = useState<any>("Hitu@123");
  const [error,setError] = useState<any>("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "something wrong happened");
      console.error(err);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/signup`,
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );
      console.log(res)
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "something wrong happened");
      console.error(err);
    }
  };
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl flex justify-center ">
        <div className="card-body">
          <h2 className="card-title justify-center">{isLoginForm?"Login":"Sign up"}</h2>
       {!isLoginForm &&    <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">FirstName</span>
            </div>
            <input
              type="text"
              placeholder="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
          </label>}
        {!isLoginForm &&   <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">LastName</span>
            </div>
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
          </label>}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Email ID</span>
            </div>
            <input
              type="text"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              placeholder="Email ID"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button
              className="btn w-full btn-primary my-2"
              onClick={isLoginForm?handleLogin:handleSignUp}
            >
              {isLoginForm?"Login":"Sign Up"}
            </button>
          </div>
          <p className="text-center cursor-pointer" onClick={()=>setIsLoginForm(!isLoginForm)}>{isLoginForm?"New User? Sign up here":"Existing User login here"}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
