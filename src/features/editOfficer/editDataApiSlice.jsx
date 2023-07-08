import { apiSlice } from "../../app/api/apiSlice";

export const editDataApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        editOfficer: builder.mutation({
            query: (credentials) => ({
                url: 'https://sf-final-project-be.herokuapp.com/api/officers/:id',
                method: 'PUT',
                body: {...credentials},
            }),
        }),
    })
})

export const { officerEditMutation } = editDataApiSlice;