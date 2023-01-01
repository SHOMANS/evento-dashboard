import { createSlice } from '@reduxjs/toolkit';
import sum from 'lodash/sum';
import uniqBy from 'lodash/uniqBy';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  events: [],
  event: null,
};

const slice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET PRODUCTS
    getEventsSuccess(state, action) {
      state.isLoading = false;
      state.events = action.payload;
    },

    // GET PRODUCT
    getEventSuccess(state, action) {
      state.isLoading = false;
      state.event = action.payload;
    },

    approveEvent(state, action) {
      state.isLoading = false;
      state.events = state.events.map((item) => (item._id === action.payload ? { ...item, status: 'accepted' } : item));
    },

    rejectEvent(state, action) {
      state.isLoading = false;
      state.events = state.events.map((item) => (item._id === action.payload ? { ...item, status: 'rejected' } : item));
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  getCart,
  addCart,
  resetCart,
  onGotoStep,
  onBackStep,
  onNextStep,
  deleteCart,
  createBilling,
  applyShipping,
  applyDiscount,
  increaseQuantity,
  decreaseQuantity,
  sortByEvents,
  filterEvents,
} = slice.actions;

// ----------------------------------------------------------------------

export function getEvents() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const id = JSON.parse(window.localStorage.getItem('user'))._id;
      const response = await axios.get(`/api/events/organizer/${id || '6399cd56bb273376032cb37c'}`);
      console.log(response);
      dispatch(slice.actions.getEventsSuccess(response.data.events));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function approveEvent(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.put(`api/events/${id}/accept`);
      dispatch(slice.actions.approveEvent(id));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function rejectEvent(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.put(`api/events/${id}/reject`);
      dispatch(slice.actions.rejectEvent(id));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getEvent(name) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/events/event', {
        params: { name },
      });
      dispatch(slice.actions.getEventSuccess(response.data.event));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
