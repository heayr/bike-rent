import { createSlice } from "@reduxjs/toolkit";



const editDataSlice = createSlice({
    name: 'edit',
    initialState: {
    email: null,
    firstName: null,
    lastName: null,
    approved: null,
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
    },
}
});

export const { setCredentials } = editDataSlice.actions;
export default editDataSlice.reducer;