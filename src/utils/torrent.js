export const selectBestTorrent = (torrents, quality) => {
  return torrents
    .filter(torrent => torrent.quality === quality)
    .reduce((prevValue, currentValue) => {
      return currentValue.seeds >= prevValue.seeds ? currentValue : prevValue;
    });
};

const ytsTrackers = [
  "udp://open.demonii.com:1337/announce",
  "udp://tracker.openbittorrent.com:80",
  "udp://tracker.coppersurfer.tk:6969",
  "udp://glotorrents.pw:6969/announce",
  "udp://tracker.opentrackr.org:1337/announce",
  "udp://torrent.gresille.org:80/announce",
  "udp://p4p.arenabg.com:1337",
  "udp://tracker.leechers-paradise.org:6969",
];

export const generateYTSMagnetURL = hash => {
  return `magnet:?xt=urn:btih:${hash}&tr=${ytsTrackers.join("&tr=")}`;
};
