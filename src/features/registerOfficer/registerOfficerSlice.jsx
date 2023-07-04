import { createSlice } from "@reduxjs/toolkit";

const registerOfficerSlice = createSlice({
  name: "giveAdminRights",
  initialState: {
    email: null,
    // token: null,
    firstName: null,
    lastName: null,
    // clientId: null,
    approved: true,
    password: null,
  },
  reducers: {
    setOfficerCredentials: (state, action) => {
      state.email = action.payload.email;
      // state.token = action.payload.data.token;
      state.firstName = action.payload.data.firstName;
      state.lastName = action.payload.data.lastName;
      // state.clientId = action.payload.data.clientId;
      state.approved = true;
      state.password = action.payload.data.password;
    },
  },
});

export const { setOfficerCredentials } = registerOfficerSlice.actions;
export default registerOfficerSlice.reducer;

// export const CurrentUser = (state) => state.auth.email;
// export const CurrentToken = (state) => state.auth.token;
// export const CurrentFirstName = (state) => state.auth.firstName;
// export const CurrentLastName = (state) => state.auth.lastName;
// export const CurrentClientId = (state) => state.auth.clientId;
// export const CurrentApproved = (state) => state.auth.approved;
// export const CurrentPassword = (state) => state.auth.password;
