import {createContext, useEffect, useReducer} from 'react'

const OrdersContext = createContext({
    items: [],
    addItem: (item) => {}
});

function ordersReducer(state, action){
    if(action.type === 'ADD_ITEM'){
        const updatedItems = [...state.items];
        updatedItems.push([...action.item]);

        return {...state, items: updatedItems};
    }

    return state;
}

const initialOrders = JSON.parse(localStorage.getItem('orders')) || {items:[]};

export function OrdersContextProvider({children}){
    const [orders, dispatchOrdersAction] = useReducer(ordersReducer, initialOrders);

    useEffect(()=>{
        localStorage.setItem('orders', JSON.stringify(orders));
    }, [orders])

    function addItem(item) {
        dispatchOrdersAction({type: 'ADD_ITEM', item})
    }

    const ordersContext = {
        items: orders.items,
        addItem
    }
    console.log(ordersContext);
    return <OrdersContext.Provider value={ordersContext}>{children}</OrdersContext.Provider>
}

export default OrdersContext;