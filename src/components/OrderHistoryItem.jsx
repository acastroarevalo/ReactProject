export default function OrderHistoryItem({order}){
    return (
        <li className="cart-item"> 
        {order.map((item) => {
            return(<p key={item.id}>{item.name} - {item.quantity} x {`$${item.price}`}</p>)
        } )} 
        </li>
    )
}