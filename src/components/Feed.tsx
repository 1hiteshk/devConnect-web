import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import { useNavigate } from "react-router-dom";

type Props = {};

const Feed = (props: Props) => {
  const feed = useSelector((store: any) => store.feed);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const isFetching = useRef(false); // ✅ Prevent multiple API calls
  const navigate = useNavigate();

  //console.log({ feed });
  // console.log(feed.length  );
  const dispatch = useDispatch();

  const getFeed = async (pageNum = page) => {
    if (isFetching.current || feed.length > 1) return; // ✅ Stop extra API calls
    isFetching.current = true;
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/feed?page=${pageNum}`, {
        withCredentials: true,
      }); // pass with credentials : true to make successful auth api call
      const users = res?.data?.data || [];
      if (users.length > 0) {
        dispatch(addFeed([...feed, ...users]));
      }
      setLoading(false);
      isFetching.current = false;
      return users;
    } catch (error) {
      if(error.status === 401) {
        navigate('/login')
      }
      console.log(error);
      setLoading(false);
      isFetching.current = false;
    }
  };

  useEffect(() => {
    getFeed();
  }, [page]);

  /*  const fetchMoreUsers = async () => {
    if (loading || feed.length>1) return;
    console.log(feed.length, loading);
    if (feed.length === 1 || feed.length === 0) {
      const nextPage = page + 1;
      const newUsers = await getFeed(nextPage);
      if (newUsers?.length > 0) {
        setPage(nextPage);
        dispatch(addFeed([...feed, ...newUsers]));
      }
    }
  }; */

  //console.log({feed});

  useEffect(() => {
    // if (feed.length > 1 || loading) return;
    // fetchMoreUsers();
    if (feed.length === 1 || feed.length === 0) {
      setPage((prev) => prev + 1);
    }
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
