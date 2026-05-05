import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/action/hhhhhhh"
import { i } from "framer-motion/client";

export const DeleteUserModal = ({ user, setDeleteModalOpen }) => {

  const dispatch = useDispatch();
  console.log("User ID:", user.userId);
  const [updatedUser, setUpdatedUser] = useState({
    id: user.userId,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
  });

  // Handle input changes
  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e,id) => {
    e.preventDefault();
   
    dispatch(updateUser({ id: user.id, ...updatedUser }));
    console.log("User ID before dispatch:", user.id);
    console.log("Updated user: ", updatedUser);
    setEditModalOpen(false);
  };


  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-5 rounded-md shadow-lg w-[400px]">
          <div className="flex justify-center items-center">
          <h2 className="text-xlg flex self-center font-bold mb-3 text-blue-500">Edit User {updatedUser.id}</h2>
          </div>
        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium">First Name</label>
          <input
            type="text"
            name="firstName"
            value={updatedUser.firstName}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mb-2"
          />

          <label className="block text-sm font-medium">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={updatedUser.lastName}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mb-2"
          />

          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={updatedUser.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mb-2"
          />

          <label className="block text-sm font-medium">Role</label>
          <input
            type="text"
            name="role"
            value={updatedUser.role}
            onChange={handleChange}
            className="w-full p-2 border rounded-md mb-4"
          />

          <div className="flex justify-between gap-3">
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded-md"
              onClick={() => setDeleteModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


