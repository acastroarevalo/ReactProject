import Modal from "./UI/Modal";
import WishlistItem from "./WishlistItem";
import Button from "./UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { userProgressActions } from "../redux-store/userProgressSlice";
import { wishlistActions } from "../redux-store/wishlistSlice";
import { cartActions } from "../redux-store/cartSlice";

export default function Wishlist(){
    const dispatch = useDispatch();
    const userProgressData = useSelector(state => state.userProgress);
    const wishlistData = useSelector(state => state.wishlist);

    function handleCloseWishlist(){
        dispatch(userProgressActions.hide());
    }

    function handleClearWishlist(){
        dispatch(wishlistActions.clearWishlist());
    }

    return(
        <Modal className="cart" 
          open={userProgressData.progress === 'wishlist'} 
          onClose={userProgressData.progress === 'wishlist' ? handleCloseWishlist : null}>
            <h2>Wishlist</h2>
            <ul>
                {wishlistData.items.map((item) => (
                    <WishlistItem
                    key={item.productId}
                    name={item.name}
                    price={item.price}
                    onAddToCart={() => dispatch(cartActions.addItem({
                        productId: item.productId,
                        name: item.name,
                        price: item.price,
                        description: item.description,
                        image: item.image,
                    }))}
                    onDelete={() => dispatch(wishlistActions.removeItem(item.productId))} />
                ))}
            </ul>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseWishlist}>Close</Button>
                {wishlistData.items.length > 0 ? (
                    <Button onClick={handleClearWishlist}>Clear Wishlist</Button>
                ) : null }
            </p>

        </Modal>
    )
}