// export const BASE_URL = `http://localhost:7777/api`; // for dev. mode to login sign up
// export const BASE_URL = `/api/api`; // for production
/* export const BASE_URL =
import.meta.env.MODE === "production"
    ? `/api/api` // Production URL
    : `http://localhost:7777/api`; // Development URL */

export const BASE_URL = location.hostname==='localhost'? 'http://localhost:7777/api' : '/api/api'; 

 // List of form fields to map over
export const formFields = [
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
  { name: "gender", label: "Gender", placeholder: "Gender", type: "radio" },
  { name: "about", label: "About", placeholder: "About", type: "text" },
  {
    name: "photoUrl",
    label: "Photo URL",
    placeholder: "Photo URL",
    type: "text",
  },
  {
    name: 'skills', label: "Skills", placeholder: 'Enter Skills comma separated', type: 'text',
  }
];

export const femaleImgUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXSTblEVkkdJh15jlAbC3FpvuzCKb1o-pQQA&s'
export const maleImgUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0YtOC-DWcKhaIbwJDRuAlgKJKugPwp5dfhKKgOJf_UDtKQdOeZq9CQEetxDF1jmntumU&usqp=CAU'