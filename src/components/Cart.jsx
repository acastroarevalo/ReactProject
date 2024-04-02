import Modal from "./UI/Modal";
import Button from "./UI/Button";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { userProgressActions } from "../redux-store/userProgressSlice";
import { cartActions } from "../redux-store/cartSlice";

export default function Cart(){
    const dispatch = useDispatch();
    const userProgressData = useSelector(state => state.userProgress);
    const cartData = useSelector(state => state.cart);

    const cartTotal = cartData.items.reduce((totalPrice, item) => totalPrice + (item.quantity * item.price), 0);

    function handleCloseCart(){
        dispatch(userProgressActions.hide());
    }

    function handleGoToCheckout(){
        dispatch(userProgressActions.showCheckout());
    }
    return (
        <Modal className="cart" 
            open={userProgressData.progress === 'cart'} 
            onClose={userProgressData.progress === 'cart' ? handleCloseCart : null}>
            <h2>Cart</h2>
            <ul>
                {cartData.items.map((item) => (
                    <CartItem 
                    key={item.id}
                    name={item.name}
                    quantity={item.quantity}
                    price={item.price}
                    onDecrease={() => dispatch(cartActions.removeItem(item.id))}
                    onIncrease={() => dispatch(cartActions.addItem(item))} />
                ))}
            </ul>
            <p className="cart-total">{`$${cartTotal}`}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                {cartData.items.length > 0 ? (
                    <Button onClick={handleGoToCheckout}>Go to Checkout</Button>
                ) : null }
            </p>
        </Modal>
    )
}