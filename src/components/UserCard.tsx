import React from "react";

type Props = {
  user: any;
};

const UserCard = ({ user }: Props) => {
  const { firstName, lastName, age, gender, skills, about } = user;
  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-xl">
        <figure>
          <img
            src={
              user.photoUrl ||
              "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            }
            alt="user"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {firstName + " " + lastName}
            {age && gender && (
              <div className="badge badge-secondary">{age + " " + gender}</div>
            )}
          </h2>
          <p>{about}</p>
          <div className="card-actions justify-end">
            {skills.map((skill: any) => (
              <div key={skill} className="badge badge-outline py-2">
                {skill}
              </div>
            ))}
          </div>
          <div className="card-actions flex justify-center my-4 w-full">
            <button className="btn btn-primary w-[45%]">Ignore</button>
            <button className="btn btn-success w-[45%]">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
