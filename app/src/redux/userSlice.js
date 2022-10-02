import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = false;
    },
    loginFailure: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },

    sub: (state, action) => {
      if (!state.currentUser.subscriberdUsers.includes(action.payload)) {
        state.currentUser.subscriberdUsers.push(action.payload);
      } else {
        const index = state.currentUser.subscriberdUsers.findIndex(
          (channelId) => channelId === action.payload
        );
        state.currentUser.subscriberdUsers.splice(index, 1);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginStart, loginSuccess, loginFailure, logout, sub } =
  userSlice.actions;

export default userSlice.reducer;
