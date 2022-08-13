import axios from "axios";

const baseURL = "https://yts.mx/api/v2";

const ytsAxiosInstance = axios.create({ baseURL: baseURL });

export async function fetchMoviesByFilter(filter, page = 1, limit = 10) {
  try {
    const result = await ytsAxiosInstance.get(
      `list_movies.json?sort_by=${filter}&page=${page}&limit=${limit}`,
    );
    if (result.status !== 200) throw new Error("Invalid request");
    if (result.data.movie_count <= 0) return [];
    console.log(result.data.movies);
    return result.data.movies;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
