import Button from './UI/Button';
import { useDispatch, useSelector } from 'react-redux';
import { wishlistActions } from '../redux-store/wishlistSlice';
import { cartActions } from '../redux-store/cartSlice';
import useHttp from '../hooks/useHttp';
import NotificationBox from './UI/NotificationBox';
import useNotification from '../hooks/useNotification';

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-type': 'application/json'
    }
};

const requestConfigGet = {}

export default function ProductItem({product}){
    const dispatch = useDispatch();
    const userData = useSelector(state => state.user);

    const {visible, text, showNotification} = useNotification();

    const {
        data,
        isLoading: isSending,
        error,
        sendRequest,
        clearData
    } = useHttp(`http://localhost:8080/shopcart/api/wishlist/${userData.user.userId}/${product.productId}`, requestConfig);

    const {
        data: loadedWishlist,
        isLoading: loadingWishlist,
        error: errorWishlist} = useHttp('http://localhost:8080/shopcart/api/wishlist', requestConfigGet, []);

    function handleAddProductToCart(){
        dispatch(cartActions.addItem({
            productId: product.productId,
            name: product.name,
            price: product.price,
            description: product.description,
            image: product.image,
        }))
        showNotification('Product added to cart', 1500)
    }

    function handleAddProductToWishlist(){
        //Duplicate Check
        let duplicate = false;
        var i;
        let uw = [];
        loadedWishlist.map(item => item.user.userId === userData.user.userId ? uw.push(item) : undefined);

        for(i = 0; i < uw.length; i++){
            if(uw[i].product.productId === product.productId){
                duplicate = !duplicate;
            }
        }
        if(duplicate){
            showNotification('Product already in Wishlist', 1500)
        } else{
            sendRequest();
            clearData();
            window.location.reload(false);
        }
        //Duplicate Check
    }

    return(
        <li className="meal-item">
            <article>
                <img src={product.image} alt={product.name} />
                <div>
                    <h3>{product.name}</h3>
                    <p className="meal-item-price">{`$${product.price}`}</p>
                    <p className="meal-item-description">{product.description}</p>
                </div>
                <p className="meal-item-actions">
                    <Button onClick={handleAddProductToCart}>Add to Cart</Button>
                    <Button onClick={handleAddProductToWishlist}>Add to Wishlist</Button>
                </p>
                <NotificationBox visible={visible} text={text}/>
            </article>
        </li>
    )
}