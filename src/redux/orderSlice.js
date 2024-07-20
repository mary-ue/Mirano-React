import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCart, toggleCart } from './cartSlice';
import { API_URL } from '../const';

export const sendOrder = createAsyncThunk(
  'orser/sendOrder',
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const {
        order: {
          data: {
            buyerName,
            buyerPhone,
            recipientName,
            recipientPhone,
            street,
            house,
            apartment,
            paymentOnline,
            deliveryDate,
            deliveryTime,
          },
        },
      } = getState();
      const orderData = {
        buyer: {
          name: buyerName,
          phone: buyerPhone,
        },
        recipient: {
          name: recipientName,
          phone: recipientPhone,
        },
        address: `${street}, ${house}, ${apartment}`,
        paymentOnline,
        deliveryDate,
        deliveryTime,
      };

      const response = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Не удалось оформить заказ. Попробуйте позже.');
      }

      const data = await response.json();

      dispatch(clearOrder());
      dispatch(toggleCart());
      dispatch(fetchCart());

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isOpen: false,
  orderId: '',
  status: 'idle',
  error: null,
  data: {
    buyerName: '',
    buyerPhone: '',
    recipientName: '',
    recipientPhone: '',
    street: '',
    house: '',
    apartment: '',
    paymentOnline: true,
    deliveryDate: '',
    deliveryTime: '',
  },
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
    clearOrder(state) {
      state.data = {
        buyerName: '',
        buyerPhone: '',
        recipientName: '',
        recipientPhone: '',
        street: '',
        house: '',
        apartment: '',
        paymentOnline: 'true',
        deliveryDate: '',
        deliveryTime: '',
      };
    },
    updateOrderData(state, action) {
      // state.data[action.payload.name] = action.payload.value
      state.data = { ...state.data, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, (state) => {
        state.orderId = '';
        state.status = 'loading';
        state.error = null;
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.orderId = action.payload.orderId;
        state.status = 'success';
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.orderId = '';
        state.error = action.payload || action.error.message;
      });
  },
});

export const { openModal, closeModal, clearOrder, updateOrderData } =
  orderSlice.actions;

export default orderSlice.reducer;
