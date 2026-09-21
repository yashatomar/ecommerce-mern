import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api.js';

export const createOrder = createAsyncThunk('orders/create', async (order, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/orders', order);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const getOrderDetails = createAsyncThunk('orders/getDetails', async (id, { rejectWithValue }) => {
  try {
    const { data } = await api.get(`/orders/${id}`);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetOrder: (state) => {
      state.order = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => { state.loading = true; })
      .addCase(createOrder.fulfilled, (state, action) => { state.loading = false; state.success = true; state.order = action.payload; })
      .addCase(createOrder.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(getOrderDetails.pending, (state) => { state.loading = true; })
      .addCase(getOrderDetails.fulfilled, (state, action) => { state.loading = false; state.order = action.payload; })
      .addCase(getOrderDetails.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;