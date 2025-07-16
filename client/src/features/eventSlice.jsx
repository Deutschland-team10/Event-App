import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
  name: "event",
  initialState: {
    loading: false,
    error: false,
    events: [],
    groups: [],
    chats: [],
    categories: [],
    
  },

  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    eventSuccess: (state, { payload: { data, url } }) => {
      state[url] = data.result;
      state.loading = false;
      state.error = false;
    },
    getEventCategoryGroupSuccess: (state, { payload }) => {
      state.loading = false;
      state.events = payload[0];
      state.categories = payload[1];
      state.groups = payload[2];
    },
    getChatsSuccess: (state, { payload }) => {
      state.loading = false;
      state.messages = payload
    },
  },
});

export const {
  fetchFail,
  fetchStart,
  eventSuccess,
  getEventCategoryGroupSuccess,
  getMessageSuccess,
} = eventSlice.actions;

export default eventSlice.reducer;
