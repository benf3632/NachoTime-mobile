export const selectBestTorrent = (torrents, quality) => {
  return torrents
    .filter(torrent => torrent.quality === quality)
    .reduce((prevValue, currentValue) => {
      return currentValue.seeds >= prevValue.seeds ? currentValue : prevValue;
    });
};
