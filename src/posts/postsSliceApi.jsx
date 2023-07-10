import { apiSlice } from "../app/api/apiSlice";


export const postsSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      createPost: builder.mutation({
        query: (credentials) => ({
          url: "https://sf-final-project-be.herokuapp.com/api/cases/" /* конечная точка URL */,
          method: "POST",
          body: { ...credentials, id:credentials.id },
        }),
      }),
    }),
  });
  
  // эти мутации автоматически генерируются


  export const getPostsSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      getPosts: builder.query({
        query: () => 'https://sf-final-project-be.herokuapp.com/api/cases/',
        keepUnusedDataFor: 1,
      }),
    }),
  });



  export const editPostSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      editPost: builder.mutation({
        query: (credentials) => ({
          url: `https://sf-final-project-be.herokuapp.com/api/cases/${credentials.id}`,
          method: 'PUT',
          body: {...credentials, selectPostById},
        })
      })
    })
  });


  export const { useCreatePostMutation } = postsSlice; /* небольшая деструктуризация */
export const { useGetPostsQuery } = getPostsSlice;
export const { useEditPostMutation } = editPostSlice;

export const {
  selectById: selectPostById
} = (state) => state.data.id;