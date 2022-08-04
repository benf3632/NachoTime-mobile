import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const ytsApi = createApi({
  reducerPath: "ytsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://yts.mx/api/v2" }),
  endpoints: builder => ({
    getMoviesByFilter: builder.query({
      query: (filter, page = 1, limit = 10) =>
        `list_movies.json?sort_by=${filter}&page=${page}&limit=${limit}`,
    }),
  }),
});

export const { useGetMoviesByFilter } = ytsApi;
