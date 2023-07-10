import { createSlice } from "@reduxjs/toolkit";


const postSlice = createSlice({
    name: 'post',
    initialState: {
        licenseNumber: null,
        ownerFullName: null,
        type: null,
        color: null,
        date: null,
        id: null,
        description: null,
    },
    reducers: {
        setCredentials: (state, action) => {
            state.licenseNumber = action.payload.licenseNumber;
            state.ownerFullName = action.payload.ownerFullName;
            state.type = action.payload.type;
            state.color = action.payload.color;
            state.date = action.payload.date;
            state.id = action.payload.id;
            state.description = action.payload.description;
        }
    }
})

export const { setCredentials } = postSlice.actions;
export default postSlice.reducer;

export const selectCurrentPostId = (state) => state.data._id;
export const selectCurrentLicenseNumber = (state) => state.data.licenseNumber;