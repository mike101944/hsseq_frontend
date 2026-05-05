import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";

import UserService from "../../service/UserService";

export const registerUser = createAsyncThunk("user/register", async (user,{rejectedWithValue})=>{
    try{
        const response = await UserService.registerUser(user);
        return response.data;
    }catch(error){
        return rejectedWithValue(error.response.data)
    }
});

// Get All Users
export const getAllUsers = createAsyncThunk("user/getAllUsers", async (_, { rejectWithValue }) => {
    try {
      const response = await UserService.getAllUsers();
      console.log("API response:", response.data); // Log the API response
      return response.data; // This should be the users array
    } catch (error) {
      console.error("Error fetching users:", error); // Log any errors
      return rejectWithValue(error.response?.data || "Failed to fetch users");
    }
  });

// Update User
  export const updateUser = createAsyncThunk(
    "user/updateUser",
    async (updatedUser, { rejectWithValue }) => {
      try {
        const response = await UserService.updateUser(updatedUser.id, updatedUser);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to update user");
      }
    }
  );
//delete user
  export const deleteUser = createAsyncThunk(
    "user/deleteUser",
    async (userId, { rejectWithValue }) => {
      try {
        await UserService.deleteUser(userId);
        return userId; // Return deleted user ID to remove from Redux store
      } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to delete user");
      }
    }
  );