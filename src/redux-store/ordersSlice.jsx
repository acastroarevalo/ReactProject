import { createSlice } from '@reduxjs/toolkit';

const initialOrders = JSON.parse(localStorage.getItem('orders')) || {items:[]};
const setItemFunc = (item) => localStorage.setItem('orders', JSON.stringify(item));

const ordersSlice = createSlice({
    name: 'orders',
    initialState: initialOrders,
    reducers: {
        addItem: (state, action) => {
            const order = action.payload;
            state.items.push(order);
            setItemFunc({items: state.items});
        }
    }
});

export const ordersActions = ordersSlice.actions;
export default ordersSlice;