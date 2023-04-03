import { createSlice } from "@reduxjs/toolkit";

const registerSlice = createSlice({
  name: "auth",
  initialState: {
    email: null,
    token: null,
    firstName: null,
    lastName: null,
    clientId: null,
    approved: false,
    password: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      // const { email, accessToken } = action.payload;
      state.email = action.payload.email;
      state.token = action.payload.data.token;
    },
  },
});

export const { setCredentials } = registerSlice.actions;
export default registerSlice.reducer;

export const selectCurrentUser = (state) => state.auth.email;
export const selectCurrentToken = (state) => state.auth.token;
