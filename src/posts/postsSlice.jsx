import { apiSlice } from "../app/api/apiSlice";


export const postsSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      createPost: builder.mutation({
        query: (credentials) => ({
          url: "https://sf-final-project-be.herokuapp.com/api/cases/" /* конечная точка URL */,
          method: "POST",
          body: { ...credentials },
        }),
      }),
    }),
  });
  
  // эти мутации автоматически генерируются
  export const { useCreatePostMutation } = postsSlice; /* небольшая деструктуризация */