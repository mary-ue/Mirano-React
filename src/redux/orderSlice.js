import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    openModal(state) {
      state.isOpen = true;
    },
    closeModal(state) {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = orderSlice.actions;

export default orderSlice.reducer;
