import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({

    name: "event",
    initialState: {
        loading: false,
        error: false,
        events: [],
        event:{
             _id: null,
            title: "", 
            description: "", 
            participants: [],
            date: null, 
            categoryId: "", 
            time: "", 
            image: "", 
            location: "" 
        },
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
       setEvent: (state, { payload }) => {
            state.event = payload
            
            state.error = false;
        },

    },
    eventSuccess: (state, { payload: { data, url } }) => {
      state[url] = data.result;
      state.loading = false;
      state.error = false;
    },
    setSearch: (state, { payload }) => { // 🔥 arama için reducer
      state.search = payload;
    },
    getEventCategoryGroupSuccess: (state, { payload }) => {
      state.loading = false;
      state.events = payload[0];
      state.categories = payload[1];
      state.groups = payload[2];
    },
    getChatsSuccess: (state, { payload }) => {
      state.loading = false;
      state.messages = payload;
    },
    getEvetDetailsSuccess: (state, { payload }) => {
      state.loading = false;
      state.eventDetails = payload;
    },
  },
});
export const {
  
    fetchFail,
    fetchStart,
    setEvent,
    eventSuccess,
    getEventCategoryGroupSuccess,
    getMessageSuccess,
   
} = eventSlice.actions;
export default eventSlice.reducer;
