import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [
    {
      id: 7709,
      url: "https://yts.mx/movies/black-panther-2018",
      imdb_code: "tt1825683",
      title: "Black Panther",
      title_english: "Black Panther",
      title_long: "Black Panther (2018)",
      slug: "black-panther-2018",
      year: 2018,
      rating: 7.3,
      runtime: 135,
      genres: ["Action", "Adventure", "Sci-Fi"],
      summary:
        "After the events of Captain America: Civil War, Prince T'Challa returns home to the reclusive, technologically advanced African nation of Wakanda to serve as his country's new king. However, T'Challa soon finds that he is challenged for the throne from factions within his own country. When two foes conspire to destroy Wakanda, the hero known as Black Panther must team up with C.I.A. agent Everett K. Ross and members of the Dora Milaje, Wakandan special forces, to prevent Wakanda from being dragged into a world war. —Editor",
      description_full:
        "After the events of Captain America: Civil War, Prince T'Challa returns home to the reclusive, technologically advanced African nation of Wakanda to serve as his country's new king. However, T'Challa soon finds that he is challenged for the throne from factions within his own country. When two foes conspire to destroy Wakanda, the hero known as Black Panther must team up with C.I.A. agent Everett K. Ross and members of the Dora Milaje, Wakandan special forces, to prevent Wakanda from being dragged into a world war. —Editor",
      synopsis:
        "After the events of Captain America: Civil War, Prince T'Challa returns home to the reclusive, technologically advanced African nation of Wakanda to serve as his country's new king. However, T'Challa soon finds that he is challenged for the throne from factions within his own country. When two foes conspire to destroy Wakanda, the hero known as Black Panther must team up with C.I.A. agent Everett K. Ross and members of the Dora Milaje, Wakandan special forces, to prevent Wakanda from being dragged into a world war. —Editor",
      yt_trailer_code: "u0SBlLWNe5s",
      language: "en",
      mpa_rating: "PG-13",
      background_image:
        "https://yts.mx/assets/images/movies/black_panther_2018/background.jpg",
      background_image_original:
        "https://yts.mx/assets/images/movies/black_panther_2018/background.jpg",
      small_cover_image:
        "https://yts.mx/assets/images/movies/black_panther_2018/small-cover.jpg",
      medium_cover_image:
        "https://yts.mx/assets/images/movies/black_panther_2018/medium-cover.jpg",
      large_cover_image:
        "https://yts.mx/assets/images/movies/black_panther_2018/large-cover.jpg",
      state: "ok",
      torrents: [
        {
          url: "https://yts.mx/torrent/download/9588EA0C877B8477400E81DBFEF899D139461F57",
          hash: "9588EA0C877B8477400E81DBFEF899D139461F57",
          quality: "3D",
          type: "bluray",
          seeds: 26,
          peers: 4,
          size: "2.16 GB",
          size_bytes: 2319282340,
          date_uploaded: "2018-05-28 11:28:32",
          date_uploaded_unix: 1527499712,
        },
        {
          url: "https://yts.mx/torrent/download/584CB082CB19D81DBABE3E201D89976459D495EA",
          hash: "584CB082CB19D81DBABE3E201D89976459D495EA",
          quality: "720p",
          type: "bluray",
          seeds: 310,
          peers: 40,
          size: "1.13 GB",
          size_bytes: 1213328261,
          date_uploaded: "2018-05-02 04:38:17",
          date_uploaded_unix: 1525228697,
        },
        {
          url: "https://yts.mx/torrent/download/E156CE70FEE6464549FEF653C8468AECB3E7E9F1",
          hash: "E156CE70FEE6464549FEF653C8468AECB3E7E9F1",
          quality: "1080p",
          type: "bluray",
          seeds: 766,
          peers: 129,
          size: "2.17 GB",
          size_bytes: 2330019758,
          date_uploaded: "2018-05-02 07:08:38",
          date_uploaded_unix: 1525237718,
        },
        {
          url: "https://yts.mx/torrent/download/E3B716572F44A3B24563A27DFEB2AD461754D1D8",
          hash: "E3B716572F44A3B24563A27DFEB2AD461754D1D8",
          quality: "2160p",
          type: "bluray",
          seeds: 109,
          peers: 27,
          size: "6.15 GB",
          size_bytes: 6603512218,
          date_uploaded: "2020-04-01 12:49:55",
          date_uploaded_unix: 1585738195,
        },
      ],
      date_uploaded: "2018-05-02 04:38:17",
      date_uploaded_unix: 1525228697,
    },
    {
      id: 8539,
      url: "https://yts.mx/movies/deadpool-2-2018",
      imdb_code: "tt5463162",
      title: "Deadpool 2",
      title_english: "Deadpool 2",
      title_long: "Deadpool 2 (2018)",
      slug: "deadpool-2-2018",
      year: 2018,
      rating: 7.7,
      runtime: 119,
      genres: ["Action", "Adventure", "Comedy", "Sci-Fi"],
      summary:
        "After losing Vanessa (Morena Baccarin), the love of his life, 4th-wall breaking mercenary Wade Wilson aka Deadpool (Ryan Reynolds) must assemble a team and protect a young, fat mutant Russell Collins aka Firefist (Julian Dennison) from Cable (Josh Brolin), a no-nonsense, dangerous cyborg from the future, and must also learn the most important lesson of all: to be part of a family again. —ahmetkozan",
      description_full:
        "After losing Vanessa (Morena Baccarin), the love of his life, 4th-wall breaking mercenary Wade Wilson aka Deadpool (Ryan Reynolds) must assemble a team and protect a young, fat mutant Russell Collins aka Firefist (Julian Dennison) from Cable (Josh Brolin), a no-nonsense, dangerous cyborg from the future, and must also learn the most important lesson of all: to be part of a family again. —ahmetkozan",
      synopsis:
        "After losing Vanessa (Morena Baccarin), the love of his life, 4th-wall breaking mercenary Wade Wilson aka Deadpool (Ryan Reynolds) must assemble a team and protect a young, fat mutant Russell Collins aka Firefist (Julian Dennison) from Cable (Josh Brolin), a no-nonsense, dangerous cyborg from the future, and must also learn the most important lesson of all: to be part of a family again. —ahmetkozan",
      yt_trailer_code: "20bpjtCbCz0",
      language: "en",
      mpa_rating: "R",
      background_image:
        "https://yts.mx/assets/images/movies/deadpool_2_2018/background.jpg",
      background_image_original:
        "https://yts.mx/assets/images/movies/deadpool_2_2018/background.jpg",
      small_cover_image:
        "https://yts.mx/assets/images/movies/deadpool_2_2018/small-cover.jpg",
      medium_cover_image:
        "https://yts.mx/assets/images/movies/deadpool_2_2018/medium-cover.jpg",
      large_cover_image:
        "https://yts.mx/assets/images/movies/deadpool_2_2018/large-cover.jpg",
      state: "ok",
      torrents: [
        {
          url: "https://yts.mx/torrent/download/18F05A35A335909B384D1D40D79EFEC3E71BCEE0",
          hash: "18F05A35A335909B384D1D40D79EFEC3E71BCEE0",
          quality: "720p",
          type: "bluray",
          seeds: 276,
          peers: 27,
          size: "1.11 GB",
          size_bytes: 1191853425,
          date_uploaded: "2018-08-08 21:58:54",
          date_uploaded_unix: 1533758334,
        },
        {
          url: "https://yts.mx/torrent/download/E774B886539A3F7EBF1FFE7CD01A107F73298248",
          hash: "E774B886539A3F7EBF1FFE7CD01A107F73298248",
          quality: "1080p",
          type: "bluray",
          seeds: 534,
          peers: 99,
          size: "2.14 GB",
          size_bytes: 2297807503,
          date_uploaded: "2018-08-09 00:07:16",
          date_uploaded_unix: 1533766036,
        },
        {
          url: "https://yts.mx/torrent/download/00102086B401F8CE049BE55410FF9C69D87BB740",
          hash: "00102086B401F8CE049BE55410FF9C69D87BB740",
          quality: "720p",
          type: "web",
          seeds: 59,
          peers: 11,
          size: "1.1 GB",
          size_bytes: 1181116006,
          date_uploaded: "2018-08-08 06:59:47",
          date_uploaded_unix: 1533704387,
        },
        {
          url: "https://yts.mx/torrent/download/C9BDA0A39398777B146D92C8421C48BA2ED9AEF5",
          hash: "C9BDA0A39398777B146D92C8421C48BA2ED9AEF5",
          quality: "1080p",
          type: "web",
          seeds: 170,
          peers: 46,
          size: "2.13 GB",
          size_bytes: 2287070085,
          date_uploaded: "2018-08-08 15:46:28",
          date_uploaded_unix: 1533735988,
        },
      ],
      date_uploaded: "2018-08-08 06:59:47",
      date_uploaded_unix: 1533704387,
    },
    {
      id: 13106,
      url: "https://yts.mx/movies/avengers-endgame-2019",
      imdb_code: "tt4154796",
      title: "Avengers: Endgame",
      title_english: "Avengers: Endgame",
      title_long: "Avengers: Endgame (2019)",
      slug: "avengers-endgame-2019",
      year: 2019,
      rating: 8.4,
      runtime: 181,
      genres: ["Action", "Adventure", "Drama", "Sci-Fi"],
      summary:
        "After the devastating events of Avengers: Infinity War (2018), the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos's actions and undo the chaos to the universe, no matter what consequences may be in store, and no matter who they face...",
      description_full:
        "After the devastating events of Avengers: Infinity War (2018), the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos's actions and undo the chaos to the universe, no matter what consequences may be in store, and no matter who they face...",
      synopsis:
        "After the devastating events of Avengers: Infinity War (2018), the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos's actions and undo the chaos to the universe, no matter what consequences may be in store, and no matter who they face...",
      yt_trailer_code: "8BNA-N717A0",
      language: "en",
      mpa_rating: "PG-13",
      background_image:
        "https://yts.mx/assets/images/movies/avengers_endgame_2019/background.jpg",
      background_image_original:
        "https://yts.mx/assets/images/movies/avengers_endgame_2019/background.jpg",
      small_cover_image:
        "https://yts.mx/assets/images/movies/avengers_endgame_2019/small-cover.jpg",
      medium_cover_image:
        "https://yts.mx/assets/images/movies/avengers_endgame_2019/medium-cover.jpg",
      large_cover_image:
        "https://yts.mx/assets/images/movies/avengers_endgame_2019/large-cover.jpg",
      state: "ok",
      torrents: [
        {
          url: "https://yts.mx/torrent/download/134F7AF967DBDB585A934A24C9F2A2EEE72E2A93",
          hash: "134F7AF967DBDB585A934A24C9F2A2EEE72E2A93",
          quality: "3D",
          type: "bluray",
          seeds: 77,
          peers: 12,
          size: "2.84 GB",
          size_bytes: 3049426780,
          date_uploaded: "2019-08-28 14:51:56",
          date_uploaded_unix: 1566996716,
        },
        {
          url: "https://yts.mx/torrent/download/5A4140BD59D66BCAC57CF05AF4A8FAB4EBCAE1C1",
          hash: "5A4140BD59D66BCAC57CF05AF4A8FAB4EBCAE1C1",
          quality: "720p",
          type: "bluray",
          seeds: 939,
          peers: 127,
          size: "1.43 GB",
          size_bytes: 1535450808,
          date_uploaded: "2019-08-01 14:19:21",
          date_uploaded_unix: 1564661961,
        },
        {
          url: "https://yts.mx/torrent/download/223F7484D326AD8EFD3CF1E548DED524833CB77E",
          hash: "223F7484D326AD8EFD3CF1E548DED524833CB77E",
          quality: "1080p",
          type: "bluray",
          seeds: 1934,
          peers: 309,
          size: "3.01 GB",
          size_bytes: 3231962890,
          date_uploaded: "2019-08-01 17:07:29",
          date_uploaded_unix: 1564672049,
        },
        {
          url: "https://yts.mx/torrent/download/709FBD48374D2AE13C11B07A26B5E7DDC727D720",
          hash: "709FBD48374D2AE13C11B07A26B5E7DDC727D720",
          quality: "2160p",
          type: "bluray",
          seeds: 501,
          peers: 96,
          size: "5.26 GB",
          size_bytes: 5647881994,
          date_uploaded: "2020-02-09 02:11:11",
          date_uploaded_unix: 1581210671,
        },
        {
          url: "https://yts.mx/torrent/download/9D62160EEE330397A7A7BABA989A269C58CCFD8E",
          hash: "9D62160EEE330397A7A7BABA989A269C58CCFD8E",
          quality: "720p",
          type: "web",
          seeds: 219,
          peers: 29,
          size: "1.43 GB",
          size_bytes: 1535450808,
          date_uploaded: "2019-07-29 18:45:19",
          date_uploaded_unix: 1564418719,
        },
        {
          url: "https://yts.mx/torrent/download/414A6F933C48FC7543A9CDB42C854B5457C5BCC7",
          hash: "414A6F933C48FC7543A9CDB42C854B5457C5BCC7",
          quality: "1080p",
          type: "web",
          seeds: 488,
          peers: 42,
          size: "3 GB",
          size_bytes: 3221225472,
          date_uploaded: "2019-07-29 21:31:21",
          date_uploaded_unix: 1564428681,
        },
      ],
      date_uploaded: "2019-07-29 18:45:19",
      date_uploaded_unix: 1564418719,
    },
  ],
  page: 0,
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    addMovies: (state, action) => {
      state.movies = state.movies.concat(action.payload);
    },
    incrementPage: state => {
      state.page += 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const selectMovies = state => state.movies.movies;
export const selectPage = state => state.movies.page;

export const { setMovies, addMovies, setPage, incrementPage } =
  moviesSlice.actions;

export default moviesSlice.reducer;
