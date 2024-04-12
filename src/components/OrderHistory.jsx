import Modal from "./UI/Modal";
import Button from "./UI/Button";
import OrderHistoryItem from "./OrderHistoryItem";
import { useDispatch, useSelector } from "react-redux";
import { userProgressActions } from "../redux-store/userProgressSlice";
import { Grid, Paper } from '@mui/material'
import useHttp from "../hooks/useHttp";

const requestConfig = {};

export default function OrderHistory(){
    const dispatch = useDispatch();
    const userProgressData = useSelector(state => state.userProgress);
    const ordersData = useSelector(state => state.orders);
    const userData = useSelector(state => state.user);
    
    const {
        data: loadedOrders,
        isLoading: loading,
        error: error} = useHttp('http://localhost:8080/shopcart/api/orders', requestConfig, []);

    let uo = [];
    loadedOrders.map(item => item.user.userId === userData.user.userId ? uo.push(item) : undefined);

    function handleCloseOrders(){
        dispatch(userProgressActions.hide());
    }

    return(
        <Modal className="cart" 
        open={userProgressData.progress === 'orders'} 
        onClose={userProgressData.progress === 'orders' ? handleCloseOrders : null}>
            <h2>Order History</h2>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Paper className="gridItem" style={{ color: 'white', backgroundColor: '#ffab04' }} >Id</Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className="gridItem" style={{ color: 'white', backgroundColor: '#ffab04' }} >Items</Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className="gridItem" style={{ color: 'white', backgroundColor: '#ffab04' }} >Quantity</Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className="gridItem" style={{ color: 'white', backgroundColor: '#ffab04' }} >Total</Paper>
                </Grid>
            </Grid>
            <ul>                
                {uo.map((item) => <OrderHistoryItem
                    key={item.orderId}
                    orderId={item.orderId}
                    orderItems={item.products} 
                    orderQuantities={item.productsQuantity}
                    orderPrice={item.total}/>)}
            </ul>
            {error && <Error title="Failed to load data" message={error}/>}
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseOrders}>Close</Button>
            </p>
        </Modal>
    )
}