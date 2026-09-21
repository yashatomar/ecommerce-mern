import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api.js';

export const listProducts = createAsyncThunk('products/list', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/products');
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const deleteProduct = createAsyncThunk('products/delete', async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/products/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const createProduct = createAsyncThunk('products/create', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/products', {});
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const updateProduct = createAsyncThunk('products/update', async ({ id, product }, { rejectWithValue }) => {
  try {
    const { data } = await api.put(`/products/${id}`, product);
    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,
    successCreate: false,
  },
  reducers: {
    resetProductState: (state) => {
      state.loading = false;
      state.error = null;
      state.successCreate = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listProducts.pending, (state) => { state.loading = true; })
      .addCase(listProducts.fulfilled, (state, action) => { state.loading = false; state.products = action.payload; })
      .addCase(listProducts.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p._id !== action.payload);
      })
      
      .addCase(createProduct.pending, (state) => { state.loading = true; })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.successCreate = true;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      
      .addCase(updateProduct.pending, (state) => { state.loading = true; })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.map((p) => 
          p._id === action.payload._id ? action.payload : p
        );
      })
      .addCase(updateProduct.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { resetProductState } = productSlice.actions;
export default productSlice.reducer;