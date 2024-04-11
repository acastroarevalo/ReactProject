import Button from './UI/Button';
import { useDispatch, useSelector } from 'react-redux';
import { wishlistActions } from '../redux-store/wishlistSlice';
import { cartActions } from '../redux-store/cartSlice';
import useHttp from '../hooks/useHttp';

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-type': 'application/json'
    }
};

export default function ProductItem({product}){
    const dispatch = useDispatch();
    const userData = useSelector(state => state.user);

    const {
        data,
        isLoading: isSending,
        error,
        sendRequest,
        clearData
    } = useHttp(`http://localhost:8080/shopcart/api/wishlist/${userData.user.userId}/${product.productId}`, requestConfig);

    function handleAddProductToCart(){
        dispatch(cartActions.addItem({
            productId: product.productId,
            name: product.name,
            price: product.price,
            description: product.description,
            image: product.image,
        }))
    }

    function handleAddProductToWishlist(){
        let duplicate = false;
        
        sendRequest();
        clearData();
        window.location.reload(false);
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
            </article>
        </li>
    )
}