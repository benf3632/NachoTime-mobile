import { search } from "eztv-crawler";

export async function findEpisodeTorrent(showName, season, episode) {
  const result = await search(
    `${showName} S${season.padStart(2, "0")}E${episode.padStart(2, "0")}`,
  );
  return result;
}
