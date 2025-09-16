import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usersData: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.usersData.push(action.payload);
    },

    getUser: (state, action) => {
      state.usersData = action.payload;
    },

    updateUser: (state, action) => {
      state.usersData = state.usersData.map((user) =>
        user.id === action.payload.id ? { ...user, ...action.payload } : user
      );
    },
  },
});

export const { addUser, getUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
