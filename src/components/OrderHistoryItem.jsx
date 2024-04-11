export default function OrderHistoryItem({orderId, orderItems, orderQuantities, orderPrice}){
    return (
        <li className="cart-item">
            <p>{orderId}</p>
            <p>{orderItems}</p>
            <p>{orderQuantities}</p>
            <p>{`$${orderPrice}`}</p>
        </li>
        /*<li className="cart-item"> 
        {order.map((item) => {
            return(<p key={item.id}>{item.name} - {item.quantity} x {`$${item.price}`}</p>)
        } )} 
        </li>*/
    )
}