import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import connectionSlice from "../utils/connectionSlice";

type Props = {};

const Connections = (props: Props) => {
  const dispatch = useDispatch();
  const connections = useSelector((store: any) => store.connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      console.log(res.data.data);
      //dispatch({ type: "ADD_CONNECTIONS", payload: res.data.data });
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0)
    return (
      <h1 className="flex justify-center items-center h-full font-bold text-2xl">
        No connections found
      </h1>
    );

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-2xl">Connections</h1>
      {connections.map((connection: any) => {
        const { _id, firstName, lastName, photoUrl, gender, age, about } =
          connection;
        return (
          <div key={_id} className="m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
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
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
