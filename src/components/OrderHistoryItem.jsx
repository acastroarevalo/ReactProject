import { Grid, Paper } from '@mui/material'

export default function OrderHistoryItem({orderId, orderItems, orderQuantities, orderPrice}){
    return (
        <li className="cart-item">
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Paper className="gridItem" style={{ color: 'white', backgroundColor: '#312c1d' }} >{orderId}</Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className="gridItem" style={{ color: 'white', backgroundColor: '#afa699' }} >{orderItems}</Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className="gridItem" style={{ color: 'white', backgroundColor: '#afa699' }} >{orderQuantities}</Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className="gridItem" style={{ color: 'white', backgroundColor: '#afa699' }} >{`$${orderPrice}`}</Paper>
                </Grid>
            </Grid>
        </li>
    )
}