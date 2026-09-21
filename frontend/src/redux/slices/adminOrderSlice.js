import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api.js';

export const listOrders = createAsyncThunk('adminOrders/list', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/orders');
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const deliverOrder = createAsyncThunk('adminOrders/deliver', async (id, { rejectWithValue }) => {
  try {
    const { data } = await api.put(`/orders/${id}/deliver`, {});
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

const adminOrderSlice = createSlice({
  name: 'adminOrders',
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listOrders.pending, (state) => { state.loading = true; })
      .addCase(listOrders.fulfilled, (state, action) => { state.loading = false; state.orders = action.payload; })
      .addCase(listOrders.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      
      .addCase(deliverOrder.pending, (state) => { state.loading = true; })
      .addCase(deliverOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.map((o) => 
          o._id === action.payload._id ? { ...o, isDelivered: true, deliveredAt: action.payload.deliveredAt } : o
        );
      })
      .addCase(deliverOrder.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export default adminOrderSlice.reducer;