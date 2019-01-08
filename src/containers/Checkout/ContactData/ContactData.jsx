import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Classes from './ContactData.css';
import aixos from '../../../axios-orders';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false,
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState( { loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'rudis',
        address: {
          street: 'Test 1',
          zipCode: '909090',
          country: 'Brazil',
        },
        email: 'test@test.com',
      },
      deliveryMethod: 'fastest',
    }
    aixos.post('/orders.json', order)
      .then( res => {
        this.setState( { loading: false });
        this.props.history.push('/');
      })
      .catch( error => {
        this.setState( { loading: false } );
      })
  }

  render () {
    let form = (
        <form action="">
          <input type="text" name="name" placeholder="Your Name"/>
          <input type="email" name="email" placeholder="Your Email"/>
          <input type="text" name="street" placeholder="Street"/>
          <input type="text" name="postal" placeholder="Postal Code"/>
          <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
        </form>
    );
    if (this.state.loading) {
      form = <Spinner/>
    }

    return (
      <div className={Classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        { form }
      </div>
    )
  }
}

export default ContactData;