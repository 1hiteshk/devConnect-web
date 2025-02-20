import React, { ChangeEvent, useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL, formFields } from "../utils/constant";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import InputField from "./Common/InputField";

type User = {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  about: string;
  photoUrl: string;
  skills: string[];
};

type Props = {
  user: User;
};

const EditProfile: React.FC<Props> = ({ user }) => {
  const [formData, setFormData] = useState<User>({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    age: user?.age,
    gender: user?.gender,
    about: user.about,
    photoUrl: user.photoUrl,
    skills: user?.skills,
  });
  const [error, setError] = useState<any>("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    // clear errors
    setError("");
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          age: formData.age,
          gender: formData.gender,
          about: formData.about,
          photoUrl: formData.photoUrl,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(err?.response?.data);
      console.error(err);
    }
  };

  // Update function for handling changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col justify-center my-10 gap-8 items-center md:flex-row md:gap-4">
      <div className="flex ">
        <div className="card bg-base-300 w-96 shadow-xl flex justify-center ">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
            <div className="form-container">
              {formFields.map((field) => (
                <InputField
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  value={formData[field.name as keyof User] || ""}
                  onChange={handleInputChange}
                  placeholder={field.placeholder}
                  type={field.type}
                />
              ))}
            </div>
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center">
              <button
                onClick={saveProfile}
                className="btn w-full btn-primary my-2"
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Live update of user data in UserCard */}
      <div className="flex min-h-[675px]  h-full md:h-[760px]">
      <UserCard user={formData} />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
