import Modal from "./UI/Modal";
import Input from "./UI/Input";
import Button from "./UI/Button";
import useHttp from "../hooks/useHttp";
import Error from "./Error";
import { useDispatch, useSelector } from "react-redux";
import { userProgressActions } from "../redux-store/userProgressSlice";
import { ordersActions } from "../redux-store/ordersSlice";
import { cartActions } from "../redux-store/cartSlice";

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-type': 'application/json'
    }
};

export default function Checkout() {
    const dispatch = useDispatch();
    const userProgressData = useSelector(state => state.userProgress);
    const cartData = useSelector(state => state.cart);

    const {
        data,
        isLoading: isSending,
        error,
        sendRequest,
        clearData
    } = useHttp('http://localhost:3000/orders', requestConfig);

    const cartTotal = cartData.items.reduce((totalPrice, item) => totalPrice + (item.quantity * item.price), 0);

    function handleClose(){
        dispatch(userProgressActions.hide());
    }

    function handleFinish(){
        dispatch(userProgressActions.hide());
        dispatch(cartActions.clearCart());
        clearData();
    }

    function handleSubmit(event){
        event.preventDefault();
        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        sendRequest(JSON.stringify({
                order: {
                    items: cartData.items,
                    customer: customerData
                }
            })
        );
        dispatch(ordersActions.addItem(cartData.items));
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
            <Modal open={userProgressData.progress === 'checkout'} onClose={handleFinish}>
                <h2>Order Successful</h2>
                <p className="modal-actions">
                <Button type="button" textOnly onClick={handleFinish}>Ok</Button>
                </p>
            </Modal>
        )
    }

    return (
        <Modal open={userProgressData.progress === 'checkout'} onClose={handleClose}>
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