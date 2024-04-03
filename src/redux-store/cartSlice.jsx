import { createSlice } from '@reduxjs/toolkit';

const initialCart = JSON.parse(localStorage.getItem('cart')) || {items:[]};
const setItemFunc = (item) => localStorage.setItem('cart', JSON.stringify(item));

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCart,
    reducers: {
        addItem(state, action) {
            const newItem = action.payload;
            const existingCartItem = state.items.find((item) => item.id === newItem.id);
    
            if(existingCartItem){
                existingCartItem.quantity++;
            }else {
                state.items.push({
                    id: newItem.id,
                    name: newItem.name,
                    price: newItem.price,
                    description: newItem.description,
                    image: newItem.image,
                    quantity: 1
                });
            }
            setItemFunc({items: state.items});
        },
        removeItem(state, action) {
            const id = action.payload;
            const existingCartItem = state.items.find((item) => item.id === id);
    
            if(existingCartItem.quantity === 1){                
                state.items = state.items.filter(item => item.id !== id);
            } else {
                existingCartItem.quantity--;
            }
            setItemFunc({items: state.items});
        },
        clearCart(state) {
            state.items = [];
            setItemFunc({items: state.items});
        }
    }
});

export const cartActions = cartSlice.actions;
export default cartSlice;