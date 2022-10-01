import axios, { Axios, AxiosError } from "axios";

const baseURL = "https://eztv.re/api";

const eztvAxiosInstance = axios.create({ baseURL: baseURL, timeout: 10000 });

export async function fetchShowTorrents(imdb_id, page = 1, limit = 30) {
  try {
    const stripped_imdb_id = imdb_id.replace("tt", "");
    const result = await eztvAxiosInstance.get(
      `get-torrents?imdb_id=${stripped_imdb_id}&page=${page}&limit=${limit}`,
    );
    if (result.status !== 200) throw new Error("Failed to fetch torrents");
    return result.data;
  } catch (error) {
    if (error.code === AxiosError.ECONNABORTED) {
      throw new Error("Failed to fetch torrents");
    } else {
      throw new Error("Undefined Error");
    }
  }
}

export async function findEpisodeTorrent(season, episode, imdb_id, quality) {
  // TODO: Change api (use eztv-crawler)
  let torrents_count;
  let fetched_torrents = 0;
  let best_torrent = null;
  let current_page = 1;

  // fetch first page to set variables
  let torrents = await fetchShowTorrents(imdb_id, current_page, 80);
  torrents_count = torrents.torrents_count;
  fetched_torrents += torrents.limit;
  current_page++;

  // start searching for the torrent
  torrents.torrents.forEach(torrent => {
    if (torrent.season !== season || torrent.episode !== episode) return;
    if (!torrent.filename.includes(quality)) return;
    if (best_torrent?.seeds >= torrent.seeds) return;
    best_torrent = torrent;
  });

  while (fetched_torrents < torrents_count) {
    let torrents = await fetchShowTorrents(imdb_id, current_page, 80);
    fetched_torrents += torrents.limit;
    current_page++;
    torrents.torrents.forEach(torrent => {
      if (torrent.season !== season || torrent.episode !== episode) return;
      if (!torrent.filename.includes(quality)) return;
      if (best_torrent?.seeds >= torrent.seeds) return;
      best_torrent = torrent;
    });
  }

  return best_torrent;
}
