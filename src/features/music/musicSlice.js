import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  musicList: [],
};

export const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    fetchMusics: (state, action) => {
      state.musicList = action.payload;
    },
    changeMusic: (state, action) => {
      const newState = state.musicList.map((music) => {
        if (music.id === action.payload) {
          return {
            ...music,
            active: true,
          };
        }
        return {
          ...music,
          active: false,
        };
      });
      state.musicList = newState;
    },
    previousMusic: (state) => {
      const currentIndex = state.musicList.findIndex((music) => music.active);
      if (currentIndex === 0) {
        return;
      }
      const newState = state.musicList.map((music, index) => {
        if (currentIndex === index + 1) {
          return {
            ...music,
            active: true,
          };
        }
        return {
          ...music,
          active: false,
        };
      });
      state.musicList = newState;
    },
    nextMusic: (state) => {
      const currentIndex = state.musicList.findIndex((music) => music.active);
      if (currentIndex === state.musicList.length - 1) {
        return;
      }
      const newState = state.musicList.map((music, index) => {
        if (currentIndex === index - 1) {
          return {
            ...music,
            active: true,
          };
        }
        return {
          ...music,
          active: false,
        };
      });
      state.musicList = newState;
    },
  },
});

export const { fetchMusics, changeMusic, previousMusic, nextMusic } =
  musicSlice.actions;
export default musicSlice.reducer;
