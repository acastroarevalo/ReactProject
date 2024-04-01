import {createContext, useEffect, useReducer} from 'react'

const WishlistContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {},
    clearWishlist: () => {}
});

function wishlistReducer(state, action){
    if(action.type === 'ADD_ITEM'){
        const existingWishlistIndex = state.items.findIndex((item) => item.id === action.item.id);
        const updatedItems = [...state.items];

        if(existingWishlistIndex > -1){
            alert("Product already in wishlist")
        }else {
            updatedItems.push({...action.item, quantity: 1});
        }

        return {...state, items: updatedItems};
    }

    if(action.type === 'REMOVE_ITEM'){
        const existingWishlistIndex = state.items.findIndex((item) => item.id === action.id);
        const existingWishlistItem = state.items[existingWishlistIndex];
        const updatedItems = [...state.items];

        if(existingWishlistItem.quantity === 1){
            
            updatedItems.splice(existingWishlistIndex, 1);
        } else {
            const updatedItem = {
                ...existingWishlistItem,
                quantity: existingWishlistItem.quantity - 1
            };
            updatedItems[existingWishlistIndex] = updatedItem;
        }
        return {...state, items: updatedItems};
    }

    if(action.type === 'CLEAR_WISHLIST'){
        return {...state, items: []};
    }

    return state;
}

const initialWishlist = JSON.parse(localStorage.getItem('wish')) || {items:[]};

export function WishlistContextProvider({children}){
    const [wishlist, dispatchWishlistAction] = useReducer(wishlistReducer, initialWishlist);

    useEffect(()=>{
        localStorage.setItem('wish', JSON.stringify(wishlist));
    }, [wishlist])

    function addItem(item) {
        dispatchWishlistAction({type: 'ADD_ITEM', item})
    }

    function removeItem(id) {
        dispatchWishlistAction({type: 'REMOVE_ITEM', id})
    }

    function clearWishlist(){
        dispatchWishlistAction({type: 'CLEAR_WISHLIST'})
    }

    const wishlistContext = {
        items: wishlist.items,
        addItem,
        removeItem,
        clearWishlist
    }
    console.log(wishlistContext);
    return <WishlistContext.Provider value={wishlistContext}>{children}</WishlistContext.Provider>
}

export default WishlistContext;