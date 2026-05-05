import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducer/fghjkghjk";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;