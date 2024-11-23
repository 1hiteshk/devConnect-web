import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

type Props = {};

const Feed = (props: Props) => {
  const feed = useSelector((store: any) => store.feed);
  console.log({ feed });
  const dispatch = useDispatch();
  const getFeed = async () => {
    if (feed.length > 0) return;
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

  if (!feed) return;
  if (feed.length <= 0)
    return (
      <h1 className="flex justify-center items-center h-full font-bold text-2xl">
        No new users found
      </h1>
    );
  return (
    feed && (
      <div className="flex justify-center items-center my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
