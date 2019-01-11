import React, { Component } from "react";
import Order from "../../../components/Order/Order";
import axios from '../../../axios-orders';
import errorHandler from '../../../hoc/errorHandler';


class Orders extends Component {

  state = {
    orders: [],
    loading: true,
  }

 async componentDidMount () {
   try {
    const getOrders = await axios.get('/orders.json');
    const fetchedOrders = [];
    for (const key in getOrders.data) {
      if (getOrders.data.hasOwnProperty(key)) {
        fetchedOrders.push({
          ...getOrders.data[key],
          id: key,
        })
      }
    }
     this.setState({loading: false, orders: fetchedOrders});
   } catch (error) {
    console.log(error);
    this.setState({loading: false});
   }
  }
   
  render() {
    return (
      <div>
        {this.state.orders.map(order => 
          <Order key={order.id} 
          ingredients={order.ingredients} 
           price={+order.price}/>)}  {/* { '+' convert string to number} */}
      </div>
    )
  }
}

export default errorHandler(Orders, axios);