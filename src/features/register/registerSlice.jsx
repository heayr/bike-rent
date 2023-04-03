import { createSlice } from "@reduxjs/toolkit";

const registerSlice = createSlice({
  name: "auth",
  initialState: { email: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      // const { email, accessToken } = action.payload;
      state.email = action.payload.email;
      state.token = action.payload.data.token;
    },
    // logOut: (state, action) => {
    //   state.email = null;
    //   state.token = null;
    // },
  },
});

// export const { setCredentials, logOut } = authSlice.actions;
export const { setCredentials } = registerSlice.actions;
export default registerSlice.reducer;

export const selectCurrentUser = (state) => state.auth.email;
export const selectCurrentToken = (state) => state.auth.token;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { setMessage } from "./message";
// import AuthService from "./auth.service";

// const user = JSON.parse(localStorage.getItem("user"));

// export const register = createAsyncThunk(
//   "auth/register",
//   async ({ firstName, lastName, email, password, clientId }, thunkAPI) => {
//     try {
//       const response = await AuthService.register(
//         firstName,
//         lastName,
//         email,
//         password,
//         clientId
//       );
//       thunkAPI.dispatch(setMessage(response.data.message));
//       return response.data;
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       thunkAPI.dispatch(setMessage(message));
//       return thunkAPI.rejectWithValue();
//     }
//   }
// );

// const initialState = user
//   ? { isLoggedIn: true, user }
//   : { isLoggedIn: false, user: null };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   extraReducers: {
//     [register.fulfilled]: (state, action) => {
//       state.isLoggedIn = false;
//     },
//     [register.rejected]: (state, action) => {
//       state.isLoggedIn = false;
//     },
//   },
// });

// const { reducer } = authSlice;
// export default reducer;
