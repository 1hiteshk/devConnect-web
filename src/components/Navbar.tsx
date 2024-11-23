import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constant'
import { addUser, removeUser } from '../utils/userSlice'

type Props = {}

const Navbar = (props: Props) => {
  const user = useSelector((store:any)=> store.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async() => {
    try {
      // in this api in backend we are setting token to null and expire date is the date.now()
      await axios.post(`${BASE_URL}/logout`,{},{withCredentials:true});
      // we also have to clear the redux store and redirect to login page 
      dispatch(removeUser(null));
      return navigate('/login');
      //window.location.href = '/login';
    } catch (error) {
      
    }
  }
  return (
    <div className="navbar bg-base-300">
    <div className="flex-1">
      <Link to={'/'} className="btn btn-ghost text-xl">🧑‍💻 Connect2Dev</Link>
    </div>
   { user && <div className="flex-none gap-2">
      
      <div>{user.firstName}</div>
      <div className="dropdown dropdown-end mx-5 flex ">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">   
            <img
              alt="user photo"
              src={ user.photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" } />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li>
            <Link to={'/profile'} className="justify-between">
              Profile
              <span className="badge">New</span>
            </Link>
          </li>
          <li><Link to={`/connections`}>Connections</Link></li>
          <li><a onClick={handleLogout}>Logout</a></li>
        </ul>
      </div>
    </div> }
  </div>
  )
}

export default Navbar