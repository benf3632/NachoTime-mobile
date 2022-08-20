import axios, { Axios, AxiosError } from "axios";

const baseURL = "https://yts.mx/api/v2";

const ytsAxiosInstance = axios.create({ baseURL: baseURL, timeout: 10000 });

export async function fetchMoviesByFilter(filter, page = 1, limit = 10) {
  try {
    const result = await ytsAxiosInstance.get(
      `list_movies.json?sort_by=${filter}&page=${page}&limit=${limit}`,
    );
    if (result.status !== 200) throw new Error("Failed to fetch movies");
    if (result.data.data.movie_count <= 0) return [];
    return result.data.data.movies;
  } catch (error) {
    if (error.code === AxiosError.ECONNABORTED) {
      throw new Error("Failed to fetch movies");
    } else {
      throw new Error("Undefined Error");
    }
  }
}

export async function queryMovies(query, page = 1, limit = 10) {
  try {
    const result = await ytsAxiosInstance.get(
      `list_movies.json?query_term=${query}&page=${page}&limit=${limit}`,
    );
    if (result.status !== 200) throw new Error("Failed to fetch movies");
    if (result.data.data.movie_count <= 0) return [];
    return result.data.data.movies;
  } catch (error) {
    if (error.code === AxiosError.ECONNABORTED) {
      throw new Error("Failed to fetch movies");
    } else {
      throw new Error("Undefined Error");
    }
  }
}
