import { MovieDb } from "moviedb-promise";

import { TMDB_API_KEY } from "@env";

const moviedb = new MovieDb(TMDB_API_KEY);

export async function fetchPopularTVShows(page) {
  try {
    const shows = await moviedb.tvPopular({ page });
    // console.log(shows);

    return shows.results.map(async TvResult => {
      // TODO: get movie details by calling moviedb.tvInfo
      return {
        title: TvResult.original_name,
        description: TvResult.overview,
        // imdb_code:
        rating: TvResult.vote_average,
        large_cover_image: generateImageURL(TvResult.poster_path),
        tmdbid: TvResult.id,
      };
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchTopRatedTVShows(page) {
  try {
    const shows = moviedb.tvTopRated({ page });
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchShowBackdropURL(imdbID) {
  try {
    const movie = await fetchMovie(imdbID);
    const backdrop_path = movie.backdrop_path;
    return generateImageURL(backdrop_path);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchMovie(imdbID) {
  try {
    const movie = await moviedb.find({
      external_source: "imdb_id",
      id: imdbID,
    });
    if (movie.movie_results.length <= 0) return null;
    return movie.movie_results[0];
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getMovieTMBDID(imdbID) {
  try {
    const movie = await fetchMovie(imdbID);
    return movie?.id;
  } catch (error) {
    console.error(error);
    return -1;
  }
}

export async function fetchCast(imdbID) {
  try {
    const tmbdID = await getMovieTMBDID(imdbID);
    const movieCredits = await moviedb.movieCredits({ id: tmbdID });
    let cast = movieCredits?.cast;
    cast = cast?.slice(0, 10);
    cast = cast?.map(cast => ({
      id: cast.id,
      name: cast.name,
      image: generateImageURL(cast.profile_path),
    }));
    return cast;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function generateImageURL(image_path) {
  return `https://image.tmdb.org/t/p/original/${image_path}`;
}
