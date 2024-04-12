import logoImg from '../assets/logo.jpg'
import Button from './UI/Button';
import { useDispatch, useSelector } from 'react-redux';
import { userProgressActions } from '../redux-store/userProgressSlice';

export default function Header() {
    const dispatch = useDispatch();
    const loginStateData = useSelector(state => state.loginState);
    const cartData = useSelector(state => state.cart);

    const totalCartItems = cartData.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    }, 0)

    function handleShowCart(){
        dispatch(userProgressActions.showCart());
    }

    function handleShowWishlist(){
        dispatch(userProgressActions.showWishlist());
    }

    function handleShowOrders(){
        dispatch(userProgressActions.showOrders());
    }

    function handleShowUser(){
        dispatch(userProgressActions.showUser());
    }

    function handleLogin(){
        dispatch(userProgressActions.showLogin());
    }

    function handleAddProduct(){
        dispatch(userProgressActions.showAddProduct());
    }

    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt='logoImg'/>
                <h1>MarketApp</h1>
            </div>
            <nav>
                <Button textOnly onClick={() => loginStateData.loginStatus === '' ? handleLogin() : handleShowUser()}>
                    {loginStateData.loginStatus === '' ? 'Login' : 'User'}
                </Button>
                <Button textOnly onClick={handleShowOrders}>
                    Orders
                </Button>
                <Button textOnly onClick={handleShowWishlist}>
                    Wishlist
                </Button>
                <Button textOnly onClick={handleShowCart}>
                    Cart ({totalCartItems})
                </Button>
                <Button textOnly onClick={handleAddProduct}>
                    Add Product
                </Button>
            </nav>
        </header>
    );
}