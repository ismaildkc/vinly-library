import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  albums: [],
  artists: [],
};

export const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    setAlbums: (state, action) => {
      state.albums = action.payload;
    },
    setArtists: (state, action) => {
      state.artists = action.payload;
    },
  },
});

export const { setAlbums, setArtists } = librarySlice.actions;
export default librarySlice.reducer;
