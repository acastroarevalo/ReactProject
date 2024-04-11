import Button from './UI/Button';
import useHttp from "../hooks/useHttp";

const requestConfigDelete = {
    method: 'DELETE',
    headers: {
        'Content-type': 'application/json'
    }
};

export default function WishlistItem({name, price, wishId, onAddToCart}){

    const {
        data,
        isLoading: isSending,
        error,
        sendRequest,
        clearData
    } = useHttp(`http://localhost:8080/shopcart/api/wishlist/${wishId}`, requestConfigDelete);

    function handleRemoveFromWishlist(){
        sendRequest();
        clearData();
        window.location.reload(false);
    }

    return (
        <li className="cart-item">
            <p>{name} - {`$${price}`}</p>
            <p className="meal-item-actions">
                    <Button onClick={onAddToCart}>Add to Cart</Button>
                    <Button onClick={handleRemoveFromWishlist}>x</Button>
            </p>
        </li>
    )
}