import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

type Props = {};

const Feed = (props: Props) => {
  const feed = useSelector((store: any) => store.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      }); // pass with credentials : true to make successful auth api call
      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  return (
    feed && (
      <div className="flex justify-center items-center my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
