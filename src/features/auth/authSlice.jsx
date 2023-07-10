import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { 
    email: null, 
    token: null,
     approved: false,
     clientId: null,

     },
  reducers: {
    setCredentials: (state, action) => {
      // const { email, accessToken } = action.payload;
      state.email = action.payload.email;
      state.token = action.payload.data.token;
      state.approved = action.payload.data.user.approved;
      state.clientId = action.payload.data.user.clientId;
    },
    logOut: (state, action) => {
      state.email = null;
      state.token = null;
      state.approved = false;
      state.clientId = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.email;
export const selectCurrentToken = (state) => state.auth.token;
export const selectApproved = (state) => state.auth.approved;
