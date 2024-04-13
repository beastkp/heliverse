import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  domain: "Sales",
  gender: "Male",
  available: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setDomain: (state, action) => {
      state.domain = action.payload;
    },
    setGender: (state, action) => {
      state.gender = action.payload;
    },
    setAvailable: (state) => {
      state.available = !state.available;
    },
  },
});

export const { setAvailable, setDomain, setGender } = userSlice.actions;

export default userSlice.reducer;
