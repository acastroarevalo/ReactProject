import Button from './UI/Button';
import { useDispatch } from 'react-redux';
import { wishlistActions } from '../redux-store/wishlistSlice';
import { cartActions } from '../redux-store/cartSlice';

export default function ProductItem({product}){
    const dispatch = useDispatch();

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
        dispatch(wishlistActions.addItem({
            productId: product.productId,
            name: product.name,
            price: product.price,
            description: product.description,
            image: product.image
        }));
    }

    return(
        <li className="meal-item">
            <article>
                <img /*src={`http://localhost:3000/${product.image}`}*/ src={product.image} alt={product.name} />
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