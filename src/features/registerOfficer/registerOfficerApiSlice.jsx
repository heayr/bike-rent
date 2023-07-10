import { apiSlice } from "../../app/api/apiSlice";

export const registerOfficerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    giveAdminRights: builder.mutation({
      query: (setOfficerCredentials) => ({
        url: "https://sf-final-project-be.herokuapp.com/api/officers" /* конечная точка URL */,
        method: "POST",
        body: { ...setOfficerCredentials },
      }),
    }),
  }),
});

// эти мутации автоматически генерируются
export const { useGiveAdminRightsMutation } =
  registerOfficerApiSlice; /* небольшая деструктуризация */


  //! builder.mutation changed to builder.query 