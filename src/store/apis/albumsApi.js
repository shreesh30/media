import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const albumsApi = createApi({
  // The key in the big state object where all of the APIs should be maintained
  reducerPath: "albums",
  //   API nneds to know where and how to send the request
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
  }),
  endpoints: (builder) => {
    return {
      /* fetchAlbums-> Giving a simlified name, the hook that we will be using will use this name i.e. albumsApi.useFetchAlbumsQuery
        builder.query-> tells that it is a query(GET) or a mutation(PUT,DELETE,POST)
        url-> tells what is the path for the request, relative to the base url
        params->tells what is the query string for the request
        method-> what is the method for the request(GET,PUT,DELETE,POST)
        */
      fetchAlbums: builder.query({
        // The argument that we passed in the hook, that will be passed here i.e. as an argument for "query"
        query: (user) => {
          return {
            url: "/albums",
            params: {
              userId: user.id,
            },
            method: "GET",
          };
        },
      }),
    };
  },
});

// useFetchAlbumsQuery->name of the hook created by redux toolkit query
export const { useFetchAlbumsQuery } = albumsApi;
export { albumsApi };
