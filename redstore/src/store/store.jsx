import {configureStore} from "@reduxjs/toolkit"
import cartReducer from "../cart/cartSlice"
import productsReducer from '../features/products/productsSlice';
export const store = configureStore({
    reducer: {
        products: productsReducer,
        cart: cartReducer,
    },
})