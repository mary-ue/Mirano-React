import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_URL } from '../const';

export const fetchGoods = createAsyncThunk(
  'goods/fetchGoogs',
  async (params, thunkApi) => {
    try {
      const queryString = new URLSearchParams(params).toString();

      const response = await fetch(
        `${API_URL}/api/products${queryString ? `?${queryString}` : ''}`
      );

      return await response.json();
    } catch (error) {
      return thunkApi.rejectWithValue(
        `${error.response.status}` - `${error.response.statusText}`
      );
    }
  }
);

const initialState = {
  items: [],
  status: 'idle',
  error: null,
  categories: [],
};

const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoods.pending, (state) => {
        state.status = 'loading';
        state.categories = [];
      })
      .addCase(fetchGoods.fulfilled, (state, action) => {
        state.status = 'success';
        state.items = action.payload;
        state.error = null;
        action.payload.forEach((product) => {
          if (product.categories) {
            product.categories.forEach((category) => {
              if (!state.categories.includes(category)) {
                state.categories.push(category);
              }
            });
          }
        });
      })
      .addCase(fetchGoods.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default goodsSlice.reducer;
