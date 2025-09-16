import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import planReaducer from "./planSlice";
import logReducer from "./logSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    plan: planReaducer,
    log: logReducer,
  },
});
