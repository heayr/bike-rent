import { apiSlice } from "../../app/api/apiSlice";

export const registerOfficerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (setOfficerCredentials) => ({
        url: "https://sf-final-project-be.herokuapp.com/api/officers" /* конечная точка URL */,
        method: "POST",
        body: { ...setOfficerCredentials },
      }),
    }),
  }),
});

// эти мутации автоматически генерируются
export const { useRegisterMutation } =
  registerOfficerApiSlice; /* небольшая деструктуризация */