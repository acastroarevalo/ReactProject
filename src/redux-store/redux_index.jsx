import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import cartSlice from "./cartSlice"
import wishlistSlice from "./wishlistSlice"
import ordersSlice from "./ordersSlice"
import loginStateSlice from "./loginStateSlice"
import userProgressSlice from "./userProgressSlice"

const reduxStore = configureStore({
    reducer: {
        user: userSlice.reducer,
        cart: cartSlice.reducer,
        wishlist: wishlistSlice.reducer,
        orders: ordersSlice.reducer,
        loginState: loginStateSlice.reducer,
        userProgress: userProgressSlice.reducer
    }
});

export default reduxStore;