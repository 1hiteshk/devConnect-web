import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

type Props = {};

const Requests = (props: Props) => {
  
  const requests = useSelector((store: any) => store.request);
  const dispatch = useDispatch();
  const fetchRequest = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      console.log(res.data);
      dispatch(addRequest(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  const reviewRequest = async (status:any,_id:any)=>{
    try {
        const res = await axios.post(`${BASE_URL}/request/review/${status}/${_id}`,
            {}, // so this is a post call and we don't have to send any data here 
            {withCredentials:true }
        );
        dispatch(removeRequest(_id)); // _id of user whose request we are reviewing
    } catch (error) {
        
    }
  }

  useEffect(() => {
    fetchRequest();
  }, []);
  if (!requests) return;

  if (requests.length === 0)
    return (
      <h1 className="flex justify-center items-center h-full font-bold text-2xl">
        No requests found
      </h1>
    );

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-2xl">requests</h1>
      {requests.map((request: any) => {
        const { _id, firstName, lastName, photoUrl, gender, age, about } = request.fromUserId;
        return (
          <div key={_id} className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto">
            <div>
              <img src={photoUrl} className="w-20 h-20 rounded-full" alt="avatar" />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstName} &nbsp; {lastName}
              </h2>
              {age && gender && <p>{age+","+gender}</p>}
              <p>{about}</p>
            </div>
            <div>
                <button className="btn btn-primary mx-2" onClick={()=> reviewRequest('accepted',request._id)}>Accept</button>
                <button className="btn btn-secondary mx-2" onClick={()=> reviewRequest('rejected',request._id)} >Reject</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};


export default Requests;
