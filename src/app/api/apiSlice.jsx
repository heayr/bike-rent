import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../../features/auth/authSlice";
// сначала создаем baseQuery - поскольку используем Redux, то вместо axios будет эта функция

const baseQuery = fetchBaseQuery({
  baseUrl: "https://sf-final-project-be.herokuapp.com",
  //   credentials: "include", должны отправлять cookies, но пока они ток мешаются вроде как...
  //? credentials: "include",
  //? credentials: "same-origin",
  prepareHeaders: (headers, { getState }) => {
    // для того чтобы отправлять access-token на сервер нужна функция getState()

    const token = getState().auth.token;
    if (token) {
      headers.set(
        "authorization",
        `Bearer ${token}`
      ); /*значение token тодлжно быть стороковым, поэтому используем обратные кавычки*/
    }
    return headers;

    // всегда возрращаем headers чтобы прикрепить к хедерам access-token с каждым запросом
  },
});
// если baseQuery не работает, то создаем экземпляр baseQueryWithReauth

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 403) {
    console.log("sending refresh token");
    // send refresh token to get new access token
    const refreshResult = await baseQuery("/refresh", api, extraOptions);
    console.log(refreshResult);
    if (refreshResult?.data) {
      const user = api.getState().auth.email;
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  // baseQuery,
  endpoints: (builder) => ({}),
});
