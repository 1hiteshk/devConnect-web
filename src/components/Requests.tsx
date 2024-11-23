import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";

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
                <button className="btn btn-primary mx-2">Accept</button>
                <button className="btn btn-secondary mx-2">Reject</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};


export default Requests;
