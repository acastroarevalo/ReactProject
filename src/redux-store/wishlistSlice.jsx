import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {items: []},
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload;
            const existingWishlistItem = state.items.find((item) => item.id === newItem.id);
    
            if(existingWishlistItem){
                alert("Product already in wishlist")
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
        },
        removeItem: (state, action) => {
            const newItem = action.payload;
            state.items = state.items.filter(item => item.id !== newItem);
        },
        clearWishlist: (state) => {
            state.items = [];
        }
    }
})

export const wishlistActions = wishlistSlice.actions;
export default wishlistSlice;