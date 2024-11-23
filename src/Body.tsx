import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import axios from "axios";
import { BASE_URL } from "./utils/constant";
import { useDispatch, useSelector } from "react-redux";

import { addUser } from "./utils/userSlice";

type Props = {};

const Body = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // once we have data in redux store we dont have to make api call again & again , check the store
  const userData = useSelector((store: any) => store.user);
  const fetchUser = async () => {
    if(userData) return ; 
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      console.log(res)
      dispatch(addUser(res.data));
    } catch (error) {
      // if user is not authenticated (not logged in), redirect to login page
      if(error.status === 401) {
      navigate('/login') }
      console.error(error);
    }
  };

  useEffect(() => {
      fetchUser();
  }, []);

  return (
    /* min-h-screen:

Ensures the parent container spans at least the full height of the viewport. */
    <div className="flex flex-col h-screen">
      <Navbar />
      {/*  any children routes of Body comp. will render over here in Outlet */}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
