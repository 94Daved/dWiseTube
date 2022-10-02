import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentVideo: null,
  loading: false,
  error: false,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.currentVideo = action.payload;
      state.loading = false;
    },
    fetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },

    likes: (state, action) => {
      const index = state.currentVideo.disLikes.findIndex(
        (userId) => userId === action.payload
      );
      if (!state.currentVideo.likes.includes(action.payload)) {
        state.currentVideo.likes.push(action.payload);
        state.currentVideo.disLikes.splice(index, 1);
      }
    },
    dislikes: (state, action) => {
      const index = state.currentVideo.likes.findIndex(
        (userId) => userId === action.payload
      );
      if (!state.currentVideo.disLikes.includes(action.payload)) {
        state.currentVideo.disLikes.push(action.payload);
        state.currentVideo.likes.splice(index, 1);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { fetchStart, fetchSuccess, fetchFailure, likes, dislikes } =
  videoSlice.actions;

export default videoSlice.reducer;
