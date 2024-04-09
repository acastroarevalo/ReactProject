import Modal from "./UI/Modal";
import Button from "./UI/Button";
import OrderHistoryItem from "./OrderHistoryItem";
import { useDispatch, useSelector } from "react-redux";
import { userProgressActions } from "../redux-store/userProgressSlice";

export default function OrderHistory(){
    const dispatch = useDispatch();
    const userProgressData = useSelector(state => state.userProgress);
    const ordersData = useSelector(state => state.orders);

    //console.log(ordersData);

    function handleCloseOrders(){
        dispatch(userProgressActions.hide());
    }

    return(
        <Modal className="cart" 
        open={userProgressData.progress === 'orders'} 
        onClose={userProgressData.progress === 'orders' ? handleCloseOrders : null}>
            <h2>Order History</h2>
            <ol>
                {ordersData.items.map((item) => (
                    <OrderHistoryItem
                        order={item}/>)
                    )}
            </ol>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseOrders}>Close</Button>
            </p>
        </Modal>
    )
}