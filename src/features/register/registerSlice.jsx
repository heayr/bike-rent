import { createSlice } from "@reduxjs/toolkit";

const registerSlice = createSlice({
  name: "authorize",
  initialState: {
    email: null,
    token: null,
    firstName: null,
    lastName: null,
    clientId: null,
    // approved: false,
    password: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      state.email = action.payload.email;
      state.token = action.payload.data.token;
      state.firstName = action.payload.data.firstName;
      state.lastName = action.payload.data.lastName;
      state.clientId = action.payload.data.clientId;
      state.approved = action.payload.data.approved;
      state.password = action.payload.data.password;
      state.approved = false;
      
    },
  },
});

export const { setCredentials } = registerSlice.actions;
export default registerSlice.reducer;

export const CurrentUser = (state) => state.auth.email;
export const CurrentToken = (state) => state.auth.token;
export const CurrentFirstName = (state) => state.auth.firstName;
export const CurrentLastName = (state) => state.auth.lastName;
export const CurrentClientId = (state) => state.auth.clientId;
export const CurrentApproved = (state) => state.auth.approved;
export const CurrentPassword = (state) => state.auth.password;
