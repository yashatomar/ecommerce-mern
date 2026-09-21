import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice';
import orderReducer from './slices/orderSlice';
import productReducer from './slices/productSlice'; // <-- ADDED
import adminOrderReducer from './slices/adminOrderSlice'; // <-- ADDED

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    order: orderReducer,
    products: productReducer, // <-- ADDED
    adminOrders: adminOrderReducer, // <-- ADDED
  },
});

export default store;