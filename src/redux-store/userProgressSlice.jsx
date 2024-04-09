import { createSlice } from '@reduxjs/toolkit';

const userProgressSlice = createSlice({
    name: 'userProgress',
    initialState: {progress: ''},
    reducers: {
        showCart: (state) => {
            state.progress = 'cart';
        },
        showCheckout: (state) => {
            state.progress = 'checkout';
        },
        showWishlist: (state) => {
            state.progress = 'wishlist';
        },
        showOrders: (state) => {
            state.progress = 'orders';
        },
        showUser: (state) => {
            state.progress = 'user';
        },
        showLogin: (state) => {
            state.progress = 'login';
        },
        showAddProduct: (state) => {
            state.progress = 'addProduct';
        },
        showSignUp: (state) => {
            state.progress = 'signUp';
        },
        hide: (state) => {
            state.progress = '';
        }
    }
})

export const userProgressActions = userProgressSlice.actions;
export default userProgressSlice;