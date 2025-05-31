import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import axios from "axios";
import { BASE_URL } from "./utils/constant";
import { useDispatch, useSelector } from "react-redux";

import { addUser } from "./utils/userSlice";
import BottomNavigation from "./components/BottomNavigation";

type Props = {};

const Body = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // once we have data in redux store we dont have to make api call again & again , check the store
  const userData = useSelector((store: any) => store.user);
  // if userData is already present in redux store, we don't need to fetch it again
  const fetchUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      console.log(res, "res");
      dispatch(addUser(res.data));
    } catch (error) {
      // if user is not authenticated (not logged in), redirect to login page
      if (error.status === 401) {
        navigate("/login");
      }
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  console.log(userData, "res");

  return (
    /* min-h-screen:

Ensures the parent container spans at least the full height of the viewport. */
    <div className="flex flex-col h-screen">
      <Navbar />
      {/*  any children routes of Body comp. will render over here in Outlet */}
      <Outlet />
      <Footer />
      {userData && (
        <div className="block md:hidden">
          <BottomNavigation />
        </div>
      )}
    </div>
  );
};

export default Body;
