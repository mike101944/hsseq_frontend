import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../../service/UserService";
import { registerUser,getAllUsers,updateUser,deleteUser } from "../action/hhhhhhh";


const initialState = {
    users: [], // Ensure it's an empty array
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  };
  // Create slice
  const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(registerUser.pending, (state) => {
          state.status = "loading";
          state.error = null;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
          state.status = "succeeded";
          // state.users = action.payload;
          state.users.push(action.payload);
        })
        .addCase(registerUser.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        })
        //  Handle getAllUsers
      .addCase(getAllUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload; // Replace with fetched users
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Handle updateUser
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload; // Update user in the state
          // state.users.push(action.payload);
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
       //delete user
  .addCase(deleteUser.fulfilled, (state, action) => {
    state.status = "succeeded";
    state.users = state.users.filter((user) => user.id !== action.payload);
  })
  .addCase(deleteUser.rejected, (state, action) => {
    state.status = "failed";
    state.error = action.payload;
  });
    },
  });
 
  
  export default userSlice.reducer;