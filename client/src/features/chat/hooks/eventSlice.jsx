import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
  name: "event",
  initialState: {
    loading: false,
    error: false,
    events: [],
    event: {
      _id: null,
      title: "",
      description: "",
      participants: [],
      date: null,
      categoryId: "",
      time: "",
      image: "",
      location: "",
    },

    groups: [],
    chats: [],
    categories: [],
    messages: [], // ✅ burayı ekledik
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
      state.error = false;
      state.chats = payload?.result || []; 
    },
    getMessagesSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.messages = payload?.result || [];
    },
    setEvent: (state, { payload }) => {
      state.event = payload;
      state.error = false;
    },
    addMessage: (state, { payload }) => {
      // ✅ yeni mesaj eklemek için
      state.messages.push(payload);
    },
    joinEventSuccess: (state, { payload }) => {
      const alreadyExists = state.event.participants.some(p => p._id === payload._id);
      if (!alreadyExists) {
       state.event.participants.push(payload);
      }
    }
    
    
  },

});

export const {

  fetchFail,
  fetchStart,
  setEvent,
  eventSuccess,
  getEventCategoryGroupSuccess,
  getChatsSuccess,
  joinEventSuccess,
  addMessage,
  getMessagesSuccess,

} = eventSlice.actions;

export default eventSlice.reducer;
