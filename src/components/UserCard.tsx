import axios from "axios";
import React, { useState } from "react";
import { BASE_URL, femaleImgUrl, maleImgUrl } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

type Props = {
  user: any;
};

const UserCard = ({ user }: Props) => {
  const { _id, firstName, lastName, age, gender, skills, about } = user;
  // console.log(skills);
  const newSkills = Array.isArray(skills) ? skills : skills.split(',');
  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch();

  const handleSendRequest = async (status:any,userId:any)=>{
    setLoading(true)
    try {
      const res = await axios.post(`${BASE_URL}/request/send/${status}/${userId}`,
        {}, // this is a post call so the second parameter is data 
        { withCredentials: true}
      )
      // as soon as the request is send the current User-card should go away from our feed , then next card
      dispatch(removeFeed(userId))
      setLoading(false)
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }
  return (
      <div className="card bg-base-300 w-96 shadow-xl h-full">
        <figure>
          <img className="w-full"
            src={
             user?.photoUrl ? user.photoUrl :
              gender==='male'? maleImgUrl : femaleImgUrl
            }
            alt="user"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {firstName + " " + lastName}
            {age && gender && (
              <div className="badge badge-secondary pb-[2px]">{age + " " + gender}</div>
            )}
          </h2>
          <p>{about}</p>
          <div className="card-actions justify-end">
            {newSkills.slice(0,5).map((skill: any) => (
              <div key={skill} className="badge badge-outline py-2 pt-[5px]">
                {skill}
              </div>
            ))}
          </div>
          <div className="card-actions flex justify-center my-4 w-full">
            <button className="btn btn-primary w-[45%]" onClick={()=> handleSendRequest("ignored",_id)}>{loading? <span className="loading loading-dots loading-lg"></span> :`Ignore`}</button>
            <button className="btn btn-success w-[45%]" onClick={()=> handleSendRequest("interested",_id)}>{loading?<span className="loading loading-dots loading-lg"></span>:`Interested`}</button>
          </div>
        </div>
      </div>
  );
};

export default UserCard;
