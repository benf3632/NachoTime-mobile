import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const ytsApi = createApi({
  reducerPath: "ytsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://yts.mx/api/v2" }),
  endpoints: builder => ({
    queryMovies: builder.query({
      query: options =>
        `list_movies.json?query_term=${options.query}&page=${
          options.page || 1
        }&limit=${options.limit || 10}`,
      transformResponse: (response, meta, arg) => {
        if (response.data.movie_count <= 0) return [];
        return response.data.movies;
      },
    }),
  }),
});

export const { useQueryMoviesQuery } = ytsApi;
