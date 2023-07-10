import { apiSlice } from "../../app/api/apiSlice";


export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      pushUser: builder.query({
        query: id => `https://sf-final-project-be.herokuapp.com/api/officers/id`,


        
        keepUnusedDataFor: 1,
  
      }),
    }),
  });

export const { usePushUserQuery } = userApiSlice;
