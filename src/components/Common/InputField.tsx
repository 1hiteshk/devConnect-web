import React, { ChangeEvent, useState } from "react";
import axios from "axios";
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
  }) => {
    if (name === "gender") {
      // Render radio buttons for gender
      const options = ["male", "female", "others"];
      return (
        <fieldset className="form-control w-full max-w-xs ">
          <div className="label">
            <span className="label-text">{label}</span>
          </div>
        <div className="flex justify-between">
        {options.map((option) => (
            <label key={option} className="label cursor-pointer flex gap-3">
              <span className="label-text">{option.charAt(0).toUpperCase() + option.slice(1)}</span>
              <input
                type="radio"
                name={name}
                value={option}
                checked={value === option}
                onChange={onChange}
                className="radio radio-primary"
              />
            </label>
          ))}
        </div>
        </fieldset>
      );
    }
    
     // Render standard input fields for other fields
    return(
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
  )};

  export default InputField