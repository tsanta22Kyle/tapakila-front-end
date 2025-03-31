"use client"
import React from "react";
import "./userInfo.module.css"; // Import the CSS file

const UserInfo = () => {
  const user = {
    avatar: "https://via.placeholder.com/150", // Placeholder avatar
    fullName: "John Doe",
    email: "johndoe@example.com",
  };

  return (
    <div className="container">
      <img src={user.avatar} alt="User Avatar" className="user-avatar" />
      <div className="user-details">
        <h2 className="user-name">{user.fullName}</h2>
        <p className="user-email">{user.email}</p>
      </div>
    </div>
  );
};

export default UserInfo;

