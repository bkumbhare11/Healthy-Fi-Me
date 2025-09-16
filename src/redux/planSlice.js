import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  planData: [],
};

export const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    addPlan: (state, action) => {
      state.planData.push(action.payload);
    },

    getplan: (state, action) => {
      state.planData = action.payload;
    },

    updatePlan: (state, action) => {
      state.planData = state.planData.map((plan) =>
        plan.uid === action.payload.uid ? { ...plan, ...action.payload } : plan
      );
    },
  },
});

export const { addPlan, getplan, updatePlan } = planSlice.actions;
export default planSlice.reducer;
