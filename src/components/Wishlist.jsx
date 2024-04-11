import Modal from "./UI/Modal";
import WishlistItem from "./WishlistItem";
import Button from "./UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { userProgressActions } from "../redux-store/userProgressSlice";
import { wishlistActions } from "../redux-store/wishlistSlice";
import { cartActions } from "../redux-store/cartSlice";
import useHttp from "../hooks/useHttp";

const requestConfig = {};
const requestConfigDelete = {
    method: 'DELETE',
    headers: {
        'Content-type': 'application/json'
    }
};

export default function Wishlist(){
    const dispatch = useDispatch();
    const userProgressData = useSelector(state => state.userProgress);
    const wishlistData = useSelector(state => state.wishlist);
    const userData = useSelector(state => state.user);

    const {
        data: loadedWishlist,
        isLoading: loadingWishlist,
        error: errorWishlist} = useHttp('http://localhost:8080/shopcart/api/wishlist', requestConfig, []);

    const {
        sendRequest,
        clearData} = useHttp(`http://localhost:8080/shopcart/api/wishlist/user/${userData.user.userId}`, requestConfigDelete);

    if(loadingWishlist){
        return <p className="center">Loading data...</p>
    }
    
    if(errorWishlist){
        return <Error title="Failed to load data" message={error}/>
    }

    let uw = [];
    loadedWishlist.map(item => item.user.userId === userData.user.userId ? uw.push(item) : undefined);
    /*console.log('loadedWishlist', loadedWishlist);
    console.log('uw:', uw);*/

    function handleCloseWishlist(){
        dispatch(userProgressActions.hide());
    }

    function handleClearWishlist(){
        //dispatch(wishlistActions.clearWishlist());
        sendRequest();
        clearData();
        window.location.reload(false);
    }

    return(
        <Modal className="cart" 
          open={userProgressData.progress === 'wishlist'} 
          onClose={userProgressData.progress === 'wishlist' ? handleCloseWishlist : null}>
            <h2>Wishlist</h2>
            <ul>
                {/*wishlistData.items.map((item) => (
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
                ))*/}

                {uw.map((item) => (<WishlistItem
                 key={item.wishId} 
                 name={item.product.name} 
                 price={item.product.price} 
                 wishId={item.wishId}
                 onAddToCart={() => dispatch(cartActions.addItem({
                    productId: item.product.productId,
                    name: item.product.name,
                    price: item.product.price,
                    description: item.product.description,
                    image: item.product.image,
                    }))}
                    />
                ))}

            </ul>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseWishlist}>Close</Button>
                {uw.length > 0 ? (
                    <Button onClick={handleClearWishlist}>Clear Wishlist</Button>
                ) : null }
            </p>

        </Modal>
    )
}