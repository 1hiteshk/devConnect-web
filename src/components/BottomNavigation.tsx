import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUserFriends, FaEnvelope, FaUser } from "react-icons/fa";

const navItems = [
  { name: "Home", path: "/", icon: FaHome, color: "pink" },
  { name: "Connections", path: "/connections", icon: FaUserFriends, color: "blue" },
  { name: "Requests", path: "/requests", icon: FaEnvelope, color: "teal" },
  { name: "Profile", path: "/profile", icon: FaUser, color: "violet" },
];

const colorClasses: Record<string, string> = {
    pink: "text-pink-600 border-pink-600 bg-pink-200",
    blue: "text-blue-600 border-blue-600 bg-blue-200",
    teal: "text-teal-600 border-teal-600 bg-teal-200",
    violet: "text-violet-600 border-violet-600 bg-violet-200",
  };

const BottomNavigation = () => {
  const location = useLocation();

  return (
    <div className="btm-nav flex justify-around bg-white shadow-lg fixed bottom-0 w-full">
      {navItems.map(({ name, path, icon: Icon, color }) => (
        <Link to={path} key={name} className={` flex-1  py- ${colorClasses[color]} ${
              location.pathname === path ? `border-t-4 border-${color}-600` : ""
            }`}>
          <button
            className={'flex flex-col items-center'}
          >
            <Icon className="h-6 w-6" />
            <span className="btm-nav-label">{name}</span>
          </button>
        </Link>
      ))}
    </div>
  );
};

export default BottomNavigation;
