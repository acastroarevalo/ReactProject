import { useContext } from "react";
import Modal from "./UI/Modal";
import UserProgressContext from "../store/UserProgressContext";
import Button from "./UI/Button";
import OrdersContext from "../store/OrderHistoryContext";
import OrderHistoryItem from "./OrderHistoryItem";

export default function OrderHistory(){
    const ordersCtx = useContext(OrdersContext);
    const userProgressCtx = useContext(UserProgressContext);

    function handleCloseOrders(){
        userProgressCtx.hide();
    }

    return(
        <Modal className="cart" 
        open={userProgressCtx.progress === 'orders'} 
        onClose={userProgressCtx.progress === 'orders' ? handleCloseOrders : null}>
            <h2>Order History</h2>
            <ol>
                {ordersCtx.items.map((item) => (
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