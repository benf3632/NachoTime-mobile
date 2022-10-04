import { MovieDb } from "moviedb-promise";

import { TMDB_API_KEY } from "@env";

const moviedb = new MovieDb(TMDB_API_KEY);

export async function queryShows(query, page = 1) {
  try {
    const shows = await moviedb.searchTv({ query: query, page: page });
    const shows_list = await Promise.all(
      shows.results.map(async result => transformToShow(result.id)),
    );
    return shows_list;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function transformToShow(tmdbid) {
  const tv = await moviedb.tvInfo({
    id: tmdbid,
    append_to_response: "external_ids",
  });
  return {
    title: tv.name,
    summary: tv.overview,
    imdb_code: tv.external_ids.imdb_id,
    genres: tv.genres.map(genre => genre.name),
    rating: tv.vote_average,
    large_cover_image: generateImageURL(tv.poster_path),
    backdrop_path: generateImageURL(tv.backdrop_path),
    year: tv.first_air_date.split("-")[0],
    seasons: tv.seasons,
    tmdbid: tv.id,
  };
}

export async function fetchPopularTVShows(page) {
  try {
    const shows = await moviedb.tvPopular({ page });
    const shows_list = await Promise.all(
      shows.results.map(async TvResult => transformToShow(TvResult.id)),
    );
    return shows_list;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchTvShowEpisodes(tmbdId, tvSeasons) {
  try {
    console.log(tmbdId);
    let episodes = [];
    // console.log(tmbdId);
    await Promise.all(
      tvSeasons.map(async season => {
        // console.log(season);
        const tvSeason = await moviedb.seasonInfo({
          id: tmbdId,
          season_number: season.season_number,
        });
        // console.log("MEOW");
        // console.log(tvSeason);
        episodes.push({
          season_number: tvSeason.season_number,
          name: tvSeason.name,
          episodes: tvSeason.episodes.map(episode => ({
            episode_number: episode.episode_number,
            name: episode.name,
            summary: episode.overview,
            runtime: episode.runtime,
            air_date: episode.air_date,
            still_path: episode.still_path
              ? generateImageURL(episode.still_path)
              : null,
          })),
        });
      }),
    );
    return episodes;
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

export async function fetchTvCast(tmbdID) {
  try {
    const tvCredits = await moviedb.tvCredits({ id: tmbdID });
    let cast = tvCredits?.cast;
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
