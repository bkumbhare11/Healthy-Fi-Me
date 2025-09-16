import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logsData: [],
};

export const logSlice = createSlice({
  name: "log",
  initialState,
  reducers: {
    addLog: (state, action) => {
      state.logsData.push(action.payload);
    },

    getLog: (state, action) => {
      state.logsData = action.payload;
    },

    updatePlan: (state, action) => {
      state.logsData = state.logs.map((log) =>
        log.uid === action.payload.uid ? { ...log, ...action.payload } : log
      );
    },
  },
});

export const { addLog, getLog, updateLog } = logSlice.actions;
export default logSlice.reducer;
