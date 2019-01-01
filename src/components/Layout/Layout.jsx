import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';


class Layout extends Component {

  state = {
    showSideDrawer: true,
  }

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false});
  }

  menuToggleHandler = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer};
    });
  }

  render () {
    return (
      <Aux>
      <Toolbar menuToggleClicked={this.menuToggleHandler}/>
      <SideDrawer 
        open={this.state.showSideDrawer} 
        closed={this.sideDrawerClosedHandler}/>
      <main className={classes.Content}>
        { this.props.children }
  
      </main>
    </Aux>
    )
  }
};

export default Layout;