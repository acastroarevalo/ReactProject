import { createSlice } from '@reduxjs/toolkit';

const initialWishlist = JSON.parse(localStorage.getItem('wish')) || {items:[]};
const setItemFunc = (item) => localStorage.setItem('wish', JSON.stringify(item));

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: initialWishlist,
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload;
            const existingWishlistItem = state.items.find((item) => item.productId === newItem.productId);
    
            if(existingWishlistItem){
                alert("Product already in wishlist")
            }else {
                state.items.push({
                    productId: newItem.productId,
                    name: newItem.name,
                    price: newItem.price,
                    description: newItem.description,
                    image: newItem.image,
                    quantity: 1
                });
            }
            setItemFunc({items: state.items});
        },
        removeItem: (state, action) => {
            const newItem = action.payload;
            state.items = state.items.filter(item => item.productId !== newItem);
            setItemFunc({items: state.items});
        },
        clearWishlist: (state) => {
            state.items = [];
            setItemFunc({items: state.items});
        },
        copyWishlist: (state, action) => {
            state.items = action.payload;
            setItemFunc({items: state.items});
        }
    }
})

export const wishlistActions = wishlistSlice.actions;
export default wishlistSlice;