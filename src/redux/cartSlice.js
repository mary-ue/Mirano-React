import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_URL } from '../const';

export const registerCart = createAsyncThunk('cart/registerCart', async () => {
  const response = await fetch(`${API_URL}/api/cart/register`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Не удалось зарегистрировать корзину');
  }

  return await response.json();
});

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const response = await fetch(`${API_URL}/api/cart`, {
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Не удалось получить данные корзины');
  }

  return await response.json();
});

export const addItemToCart = createAsyncThunk(
  'cart/addItemToCart',
  async ({ productId, quantity }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const cartItems = state.cart.items;

      if (isNaN(parseInt(quantity))) {
        const cartItem = cartItems.find(item => item.id === productId);
        quantity = cartItem ? cartItem.quantity + 1 : 1;
      }

      const response = await fetch(`${API_URL}/api/cart/items`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (!response.ok) {
        throw new Error('Не удалось отправить товар в корзину');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isOpen: false,
  items: [],
  status: 'idle',
  accessKey: null,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart(state) {
      state.isOpen = !state.isOpen;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerCart.fulfilled, (state, action) => {
        state.status = 'success';
        state.error = null;
        state.accessKey = action.payload.accessKey;
      })
      .addCase(registerCart.rejected, (state, action) => {
        state.status = 'failed';
        state.accessKey = '';
        state.error = action.payload || action.error.message;
      })

      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'success';
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })

      .addCase(addItemToCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.status = 'success';
        state.error = null;
        state.items = action.payload;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export const { toggleCart } = cartSlice.actions;

export default cartSlice.reducer;
