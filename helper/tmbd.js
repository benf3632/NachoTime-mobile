import { MovieDb } from "moviedb-promise";

import { TMDB_API_KEY } from "@env";

const moviedb = new MovieDb(TMDB_API_KEY);

export async function fetchShowBackdropURL(movieID) {
  try {
    const res = await moviedb.find({ external_source: "imdb_id", id: movieID });
    if (res.movie_results.length <= 0) return null;

    const backdrop_path = res.movie_results[0].backdrop_path;
    return generateImageURL(backdrop_path);
  } catch (error) {
    console.error(error);
    return null;
  }
}

function generateImageURL(image_path) {
  return `https://image.tmdb.org/t/p/original/${image_path}`;
}
