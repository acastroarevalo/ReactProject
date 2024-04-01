import { useContext } from "react";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import Modal from "./UI/Modal";
import WishlistItem from "./WishlistItem";
import Button from "./UI/Button";
import WishlistContext from "../store/WishlistContext";

export default function Wishlist(){
    const wishCtx = useContext(WishlistContext);
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    function handleCloseWishlist(){
        userProgressCtx.hide();
    }

    function handleClearWishlist(){
        wishCtx.clearWishlist();
    }

    return(
        <Modal className="cart" 
          open={userProgressCtx.progress === 'wishlist'} 
          onClose={userProgressCtx.progress === 'wishlist' ? handleCloseWishlist : null}>
            <h2>Wishlist</h2>
            <ul>
                {wishCtx.items.map((item) => (
                    <WishlistItem
                    key={item.id}
                    name={item.name}
                    price={item.price}
                    onAddToCart={() => cartCtx.addItem(item)}
                    onDelete={() => wishCtx.removeItem(item.id)} />
                ))}
            </ul>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseWishlist}>Close</Button>
                {wishCtx.items.length > 0 ? (
                    <Button onClick={handleClearWishlist}>Clear Wishlist</Button>
                ) : null }
            </p>

        </Modal>
    )
}