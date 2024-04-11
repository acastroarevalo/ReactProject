import Modal from "./UI/Modal";
import Button from "./UI/Button";
import OrderHistoryItem from "./OrderHistoryItem";
import { useDispatch, useSelector } from "react-redux";
import { userProgressActions } from "../redux-store/userProgressSlice";
import useHttp from "../hooks/useHttp";

const requestConfig = {};

export default function OrderHistory(){
    const dispatch = useDispatch();
    const userProgressData = useSelector(state => state.userProgress);
    const ordersData = useSelector(state => state.orders);
    const userData = useSelector(state => state.user);

    const {
        data: loadedProducts,
        isLoading: loading,
        error: error} = useHttp('http://localhost:8080/shopcart/api/products', requestConfig, []);
    
    const {
        data: loadedOrders} = useHttp('http://localhost:8080/shopcart/api/orders', requestConfig, []);

    if(loading){
        return <p className="center">Loading data...</p>
    }
    
    if(error){
        return <Error title="Failed to load data" message={error}/>
    }

    let uo = [];
    loadedOrders.map(item => item.user.userId === userData.user.userId ? uo.push(item) : undefined);

    function handleCloseOrders(){
        dispatch(userProgressActions.hide());
    }

    return(
        <Modal className="cart" 
        open={userProgressData.progress === 'orders'} 
        onClose={userProgressData.progress === 'orders' ? handleCloseOrders : null}>
            <h2>Order History</h2>
            <p>Id {'\t'} Items {'\t'} Quantity {'\t'} Total</p>
            <ul>
                {/*ordersData.items.map((item) => (
                    <OrderHistoryItem
                        order={item}/>)
                    )*/}
                
                {uo.map((item) => <OrderHistoryItem
                    key={item.orderId}
                    orderId={item.orderId}
                    orderItems={item.products} 
                    orderQuantities={item.productsQuantity}
                    orderPrice={item.total}/>)}
            </ul>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseOrders}>Close</Button>
            </p>
        </Modal>
    )
}