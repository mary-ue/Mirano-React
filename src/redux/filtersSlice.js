import { createSlice } from '@reduxjs/toolkit';
import { isNumber } from '../utils';

const initialState = {
  type: 'bouquets',
  minPrice: '',
  maxPrice: '',
  category: '',
  search: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changeType(state, action) {
      state.type = action.payload;
      state.minPrice = '';
      state.maxPrice = '';
      state.category = '';
      state.search = '';
    },
    changePrice(state, action) {
      if (isNumber(action.payload.value) || action.payload.value === '') {
        state[action.payload.name] = action.payload.value;
      }
    },
    changeCategory(state, action) {
      state.category = action.payload;
    },
    changeSearch(state, action) {
      state.type = '';
      state.minPrice = '';
      state.maxPrice = '';
      state.category = '';
      state.search = action.payload;
    },
  },
});

export const { changeType, changePrice, changeCategory, changeSearch } =
  filtersSlice.actions;

export default filtersSlice.reducer;
