import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "https://sf-final-project-be.herokuapp.com/api/auth/sign_in" /* конечная точка URL */,
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

// эти мутации автоматически генерируются
export const { useLoginMutation } =
  authApiSlice; /* небольшая деструктуризация */
