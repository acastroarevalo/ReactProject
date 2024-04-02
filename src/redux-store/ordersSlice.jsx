import { createSlice } from '@reduxjs/toolkit';

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {items:[]},
    reducers: {
        addItem: (state, action) => {
            const order = action.payload;
            state.items.push(order);
        }
    }
});

export const ordersActions = ordersSlice.actions;
export default ordersSlice;