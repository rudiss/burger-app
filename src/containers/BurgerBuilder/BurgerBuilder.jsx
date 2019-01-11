import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorHandler from '../../hoc/errorHandler';

class BurgerBuilder extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {...};
  // }
  
  state = {
    purchasing: false,
    loading: false,
    error: false
  };

  async componentDidMount () {
    // try {
    //   const getIngredients = await axios.get('https://bugger-app.firebaseio.com/ingredients.json');
    //   this.setState({ingredients: getIngredients.data})
    // } catch (error) {
    //   this.setState({error: true})
    // }
    
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = async () => {
    this.props.history.push('/checkout');
    // try {
    //   this.setState({loading: true})
    //   const order = {
    //     ingredients: this.state.ingredients,
    //     price: this.props.price,
    //     customer: {
    //       name: 'Rudinei Silva',
    //       address: {
    //         street: 'Test street 1',
    //         zipCode: '96030280',
    //         country: 'Brazil',
    //       },
    //       email: 'rudis@gmail.com'
    //     },
    //     deliveryMethod: 'fastest'
    //   }
    //   await axios.post('/orders.json', order);
    //   await this.setState({ loading: false, purchasing: false });

    //   const queryParams = [];
    //   for (let i in this.state.ingredients) {
    //     queryParams.push(encodeURIComponent(i) + '=' +  encodeURIComponent(this.state.ingredients[i]));
    //   }
    //   queryParams.push('price=' + this.state.totalPrice);
    //   const queryString = queryParams.join('&');
    //   this.props.history.push({
    //     pathname: '/checkout',
    //     search: `?${queryString}`,
    //   });
      
    // } catch (error) {
    //   this.setState({ loading: false, purchasing: false });
    //   console.log(error);
    // }
  }

  updatePurchaseState (ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      }).reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0
  }


  render () {
    const disabledInfo = {
      ...this.props.ings,
    };
    
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    };

    let orderSummary = null;
    let burger = this.state.error ? <p style={{textAlign: 'center'}}>ingredients can't be loaded!</p> : <Spinner />;

    if (this.props.ings) { burger = (
      <React.Fragment>
        <Burger ingredients={ this.props.ings }/>
        <BuildControls 
          ingredientAdded={ this.props.onIngredientAdded }
          ingredientRemoved={ this.props.onIngredientRemoved }
          disabled={disabledInfo}
          price={this.props.price}
          purchasable={this.updatePurchaseState(this.props.ings)}
          ordered={this.purchaseHandler} />
      </React.Fragment>
    );

      orderSummary = <OrderSummary
      price={this.props.price.toFixed(2)}
      purchaseCancelled={this.purchaseCancelHandler}
      purchaseContinue={this.purchaseContinueHandler}
      ingredients={this.props.ings}/>
  
    }
    if (this.state.loading) {
      orderSummary =  <Spinner />;
    }

    return (
      <React.Fragment>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
}

const mapToDispatch = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
    onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
  }
}

export default connect(mapStateToProps, mapToDispatch)(ErrorHandler(BurgerBuilder, axios));