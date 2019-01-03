import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorHandler from '../../hoc/errorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};
class BurgerBuilder extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {...};
  // }
  
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
  };

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = async () => {
    try {
      this.setState({loading: true})
      const order = {
        ingredients: this.state.ingredients,
        price: this.state.totalPrice,
        customer: {
          name: 'Rudinei Silva',
          address: {
            street: 'Test street 1',
            zipCode: '96030280',
            country: 'Brazil',
          },
          email: 'rudis@gmail.com'
        },
        deliveryMethod: 'fastest'
      }
      await axios.post('/orders.json', order);
      await this.setState({ loading: false, purchasing: false });
      
    } catch (error) {
      this.setState({ loading: false, purchasing: false });
      console.log(error);
    }
  }

  updatePurchaseState (ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      }).reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState(({purchasable: sum > 0}))
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const updateIngredients = {
      ...this.state.ingredients,
    }
    const newPrice = oldPrice + priceAddition;

    updateIngredients[type] = updatedCount;
    this.setState({totalPrice: newPrice, ingredients: updateIngredients});
    this.updatePurchaseState(updateIngredients);
  }
  
  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    
    if (oldCount <= 0) return;

    const updatedCount = oldCount - 1;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const updateIngredients = {
      ...this.state.ingredients,
    }
    const newPrice = oldPrice - priceDeduction;

    updateIngredients[type] = updatedCount;
    this.setState({totalPrice: newPrice, ingredients: updateIngredients});
    this.updatePurchaseState(updateIngredients);
  }
  render () {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    
    for(let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    };

    let orderSummary = <OrderSummary
      price={this.state.totalPrice.toFixed(2)}
      purchaseCancelled={this.purchaseCancelHandler}
      purchaseContinue={this.purchaseContinueHandler}
      ingredients={this.state.ingredients}/>
      
    if (this.state.loading) {
      orderSummary =  <Spinner />;
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        <Burger ingredients={ this.state.ingredients }/>
        <BuildControls 
        ingredientAdded={ this.addIngredientHandler }
        ingredientRemoved={ this.removeIngredientHandler }
        disabled={disabledInfo}
        price={this.state.totalPrice}
        purchasable={this.state.purchasable}
        ordered={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default ErrorHandler(BurgerBuilder, axios);