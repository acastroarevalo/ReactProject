import { UserProgressContextProvider } from "./store/UserProgressContext";
import { CartContextProvider } from "./store/CartContext";
import { LoginStateContextProvider } from "./store/LoginStateContext";
import { UserContextProvider } from "./store/UserContext";
import { WishlistContextProvider } from "./store/WishlistContext";
import { OrdersContextProvider } from "./store/OrderHistoryContext";
import Header from "./components/Header";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Wishlist from "./components/Wishlist";
import OrderHistory from "./components/OrderHistory";
import User from "./components/User";
import Login from "./components/Login";
import AddProduct from "./components/AddProduct";
import SignUp from "./components/SignUp";

function App() {
  return (
      <>
        <Header/>
        <Products/>
        <Cart/>
        <Checkout/>
        <Wishlist/>
        <OrderHistory/>
        <User/>
        <Login/>
        <AddProduct/>
        <SignUp/>
      </>
  );
}

export default App;
