import Button from './UI/Button';

export default function WishlistItem({name, price, onAddToCart, onDelete}){
    return (
        <li className="cart-item">
            <p>{name} - {`$${price}`}</p>
            <p className="meal-item-actions">
                    <Button onClick={onAddToCart}>Add to Cart</Button>
                    <Button onClick={onDelete}>x</Button>
            </p>
        </li>
    )
}