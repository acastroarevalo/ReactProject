import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";
import Error from "./Error";
import OrdersContext from "../store/OrderHistoryContext";

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-type': 'application/json'
    }
};

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const ordersCtx = useContext(OrdersContext);

    const {
        data,
        isLoading: isSending,
        error,
        sendRequest,
        clearData
    } = useHttp('http://localhost:3000/orders', requestConfig);

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + (item.quantity * item.price), 0);

    function handleClose(){
        userProgressCtx.hide();
    }

    function handleFinish(){
        userProgressCtx.hide();
        cartCtx.clearCart();
        clearData();
    }

    function handleSubmit(event){
        event.preventDefault();
        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        sendRequest(JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData
                }
            })
        );
        ordersCtx.addItem(cartCtx.items)
    }
    
    let actions = (
        <>
            <Button type="button" textOnly onClick={handleClose}>Close</Button>
            <Button>Submit Order</Button>
        </>);

    if (isSending){
        actions = <span>Sending Data...</span>
    }

    if(data && !error){
        return(
            <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleFinish}>
                <h2>Order Successful</h2>
                <p className="modal-actions">
                <Button type="button" textOnly onClick={handleFinish}>Ok</Button>
                </p>
            </Modal>
        )
    }

    return (
        <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total: {cartTotal}</p>
                <Input label="Full Name" type="text" id="name" />
                <Input label="E-mail" type="email" id="email" />
                <Input label="Street" type="text" id="street" />
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code" />
                    <Input label="City" type="text" id="city" />
                </div>
                {error && <Error title="Submission failed" message={error}/>}
                <p className="modal-actions">
                    {actions}
                </p>
            </form>
        </Modal>
    )
}