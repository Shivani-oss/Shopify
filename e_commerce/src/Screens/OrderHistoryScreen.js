import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { listOrderHistory } from '../reducer/orderAction'

function OrderHistoryScreen(props) {
    const orderHistoryList = useSelector((state) => state.orderHistory)
    const { loading, orders, error } = orderHistoryList
    const dispatch = useDispatch()
    
    // useEffect(() => {
    //     dispatch(listOrderHistory())
        
    // }, [dispatch])
    
    return (
        <div>
            <h1>Order History</h1>
            {loading ? (<LoadingBox />) :
                error ? (<MessageBox variant='danger'>{error}</MessageBox>) : (
                    <table className="table">
                        <thread>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thread>
                        <tbody>
                            {orders.map((order) => {
                                <tr>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.subsstring(0, 10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                                    <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No'}</td>
                                    <td>
                                        <button className="button secondary" onClick={() => {props.history.push(`order/${order._id}`)}}>Details</button>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                )}
        </div>
    )
}

export default OrderHistoryScreen
