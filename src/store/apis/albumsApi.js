import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

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
        providesTags: (result, error, user) => {
          const tags = result.map((album) => {
            return { type: "Album", id: album.id };
          });
          tags.push({ type: "UsersAlbum", id: user.id });
          return tags;
        },
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
      addAlbum: builder.mutation({
        invalidatesTags: (result, error, user) => {
          return [
            {
              type: "UsersAlbum",
              id: user.id,
            },
          ];
        },
        query: (user) => {
          return {
            url: "/albums",
            method: "POST",
            body: {
              userId: user.id,
              title: faker.commerce.productName(),
            },
          };
        },
      }),
      removeAlbum: builder.mutation({
        invalidatesTags: (result, error, album) => {
          return [
            {
              type: "Album",
              id: album.id,
            },
          ];
        },
        query: (album) => {
          return {
            url: `/albums/${album.id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

// useFetchAlbumsQuery->name of the hook created by redux toolkit query
export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} = albumsApi;
export { albumsApi };
