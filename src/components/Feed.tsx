import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

type Props = {};

const Feed = (props: Props) => {
  const feed = useSelector((store: any) => store.feed);
  const [page,setPage] = useState(1);
  const [loading,setLoading] = useState(false);

  //console.log({ feed });
  //console.log(feed.length  );
  const dispatch = useDispatch();

  const getFeed = async (pageNum = 1) => {
   // if (feed.length > 0) return;
   if (loading) return;
   setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/feed?page=${pageNum}`, {
        withCredentials: true,
      }); // pass with credentials : true to make successful auth api call
      const users = res?.data?.data || [];
      if (users.length > 0) {
        dispatch(addFeed(users));
      }
      setLoading(false);
      return users;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

    const fetchMoreUsers = async () => {
      if (feed.length === 1 || feed.length === 0) {
        const nextPage = page + 1;
        const newUsers = await getFeed(nextPage);
        if (newUsers?.length > 0) {
          setPage(nextPage);
        }
      }
    };

  useEffect(() => {
    fetchMoreUsers();
  }, [feed]);

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
