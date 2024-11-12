import React, { ChangeEvent, useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";

// Props for InputField component
interface InputFieldProps {
  label: string;
  name: string; // name for easy identification in handleInputChange
  value: string | number | string[];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
}

// Reusable InputField component with type definitions
const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) => (
  <label className="form-control w-full max-w-xs">
    <div className="label">
      <span className="label-text">{label}</span>
    </div>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="input input-bordered w-full max-w-xs"
      name={name} // setting name for easy identification in handleInputChange
    />
  </label>
);

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
    firstName: user.firstName,
    lastName: user.lastName,
    age: user.age,
    gender: user.gender,
    about: user.about,
    photoUrl: user.photoUrl,
    skills: user.skills,
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
          photoUrl: formData.photoUrl
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

  // List of form fields to map over
  const formFields = [
    {
      name: "firstName",
      label: "First Name",
      placeholder: "First Name",
      type: "text",
    },
    {
      name: "lastName",
      label: "Last Name",
      placeholder: "Last Name",
      type: "text",
    },
    { name: "age", label: "Age", placeholder: "Age", type: "number" },
    { name: "gender", label: "Gender", placeholder: "Gender", type: "text" },
    { name: "about", label: "About", placeholder: "About", type: "text" },
    {
      name: "photoUrl",
      label: "Photo URL",
      placeholder: "Photo URL",
      type: "text",
    },
  ];

  // Update function for handling changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex justify-center my-10 gap-4">
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
      <UserCard user={formData} />
      {showToast && <div className="toast toast-top toast-center">
 
 <div className="alert alert-success">
   <span>Profile saved successfully.</span>
 </div>
</div>}
    </div>
  );
};

export default EditProfile;
