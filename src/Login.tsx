import axios from "axios";
import React, { useState } from "react";

type Props = {};

const Login = (props: Props) => {
    const[email,setEmail]=useState<any>('');
    const[password,setPassword]=useState<any>("");

    const handleLogin = async()=> {
        try{
            const res = await axios.post('http://localhost:3001/login', {
                email,
                password
            });
        } catch(err){
            console.error(err);
        }

    }
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl flex justify-center ">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Email ID</span>
            </div>
            <input
              type="text"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
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
              onChange={(e)=>setPassword(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <div className="card-actions justify-center">
            <button className="btn btn-primary my-2">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
