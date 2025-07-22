import { createSlice } from '@reduxjs/toolkit';

// Helper to update localStorage
const updateLocalStorage = (cartItems) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const existing = state.cartItems.find(item => item.id === action.payload.id);
      if (existing) {
        existing.quantity += action.payload.quantity || 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: action.payload.quantity || 1 });
      }
      updateLocalStorage(state.cartItems);
    },
    increment(state, action) {
      const item = state.cartItems.find(item => item.id === action.payload);
      if (item) item.quantity += 1;
      updateLocalStorage(state.cartItems);
    },
    decrement(state, action) {
      const item = state.cartItems.find(item => item.id === action.payload);
      if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
          state.cartItems = state.cartItems.filter(i => i.id !== action.payload);
        }
      }
      updateLocalStorage(state.cartItems);
    },
    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
      updateLocalStorage(state.cartItems);
    },
    clearCart(state) {
      state.cartItems = [];
      updateLocalStorage(state.cartItems);
    },
    setCartItems(state, action) {
      state.cartItems = action.payload;
      updateLocalStorage(state.cartItems);
    },
    setCartFromStorage(state, action) {
      state.cartItems = action.payload;
      updateLocalStorage(state.cartItems);
    },
  },
});

export const {
  addToCart,
  increment,
  decrement,
  removeFromCart,
  clearCart,
  setCartItems,
  setCartFromStorage
} = cartSlice.actions;

export default cartSlice.reducer;
