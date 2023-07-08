import { apiSlice } from "../../app/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "https://sf-final-project-be.herokuapp.com/api/officers/",

      keepUnusedDataFor: 1,
    }),
  }),
});

export const { useGetUsersQuery } = usersApiSlice;
