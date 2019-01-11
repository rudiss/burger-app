import React, {Component} from 'react';
import { connect } from "react-redux";

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Classes from './ContactData.css';
import aixos from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
         validation: {
          required: true,
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code',
        },
        value: '',
         validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: '',
         validation: {
          required: true,
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email',
        },
        value: '',
         validation: {
          required: true,
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest'},
            { value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: '',
        validation: {
          required: false,
        },
        valid: true,
      },
    },
    loading: false,
    formIsValid: false,
  }

  checkValidity(value, rules) {

    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState( { loading: true });
    const formData = {};
    for (const formElementIdentifier in this.state.orderForm) {
      if (this.state.orderForm.hasOwnProperty(formElementIdentifier)) {
        formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;        
      }
    };

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
    };
    
    aixos.post('/orders.json', order)
      .then( res => {
        this.setState( { loading: false });
        this.props.history.push('/');
      })
      .catch( error => {
        this.setState( { loading: false } );
      })
  }

  inputChangedHandler = (event, inputIdentifier) => {
    let formIsValid = false;

    const updatedOrderForm = {
      ...this.state.orderForm
    };

    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };

    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;

    for(let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    

    updatedOrderForm[inputIdentifier] = updatedFormElement;
    this.setState({orderForm: updatedOrderForm, formIsValid});
  }

  render () {
    const formElements = [];
    for (const key in this.state.orderForm) {
      if (this.state.orderForm.hasOwnProperty(key)) {
        formElements.push({
          id: key,
          config: this.state.orderForm[key]
        });
      }
    }
    
    let form = (
        <form onSubmit={this.orderHandler}>
          {formElements.map(formElement => (
            <Input 
              key={formElement.id} 
              elementType={formElement.config.elementType} 
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.valid}
              touched={formElement.config.touched}
              changed={(event) => this.inputChangedHandler(event, formElement.id)} />
          ))}
          <Button disabled={!this.state.formIsValid} btnType="Success">Order</Button>
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

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
}

export default connect(mapStateToProps)(ContactData);