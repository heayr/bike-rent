import { apiSlice } from "../../app/api/apiSlice";

export const registerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: "https://sf-final-project-be.herokuapp.com/api/auth/sign_up" /* конечная точка URL */,
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

// эти мутации автоматически генерируются
export const { useRegisterMutation } =
  registerApiSlice; /* небольшая деструктуризация */
