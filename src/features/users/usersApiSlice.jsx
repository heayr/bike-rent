import { apiSlice } from "../../app/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "https://sf-final-project-be.herokuapp.com/api/officers/",

      keepUnusedDataFor: 1,
    }),
  }),
});

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.mutation({
      query: (credentials) => `https://sf-final-project-be.herokuapp.com/api/officers/${credentials.id}`,
      method: 'DELETE',
      keepUnusedDataFor: 1,
    }),
  }),
});




export const user2ApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser2: builder.query({
      query: (credentials) => `https://sf-final-project-be.herokuapp.com/api/officers/${credentials._id}`
    }),
  }),
});

// export const userApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     pushUser: builder.query({
//       query: (credentials) => `https://sf-final-project-be.herokuapp.com/api/officers/${credentials.id}`,
//       keepUnusedDataFor: 1,

//     }),
//   }),
// });

export const { useGetUsersQuery } = usersApiSlice;
export const { useGetUserMutation } = userApiSlice;
export const { useGetUser2Query } = user2ApiSlice;
// export const { useGetUserQuery } = userApiSlice;
// export const { usePushUserMutation } = userApiSlice;
