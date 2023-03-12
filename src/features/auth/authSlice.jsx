import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { email: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      // const { email, accessToken } = action.payload;
      state.email = action.payload.email;
      state.token = action.payload.data.token;
    },
    logOut: (state, action) => {
      state.email = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.email;
export const selectCurrentToken = (state) => state.auth.token;
