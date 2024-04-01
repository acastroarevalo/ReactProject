import { useContext } from 'react';
import logoImg from '../assets/logo.jpg'
import Button from './UI/Button';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';
import LoginStateContext from '../store/LoginStateContext';
import SearchBar from './UI/SearchBar';

export default function Header() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const loginStateCtx = useContext(LoginStateContext);

    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    }, 0)

    function handleShowCart(){
        userProgressCtx.showCart();
    }

    function handleShowWishlist(){
        userProgressCtx.showWishlist();
    }

    function handleShowOrders(){
        userProgressCtx.showOrders();
    }

    function handleShowUser(){
        userProgressCtx.showUser();
    }

    function handleLogin(){
        userProgressCtx.showLogin();
    }

    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt='logoImg'/>
                <h1>MarketApp</h1>
            </div>
            <nav>
                <Button textOnly onClick={() => loginStateCtx.loginStatus === '' ? handleLogin() : handleShowUser()}>
                    {loginStateCtx.loginStatus === '' ? 'Login' : 'User'}
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
                <SearchBar/>
            </nav>
        </header>
    );
}