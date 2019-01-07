import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationList from '../NavigationList/NavigationList';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = props => {
  let attachedClasses = [classes.SideDrawer, classes.Close];

  if (props.open) attachedClasses = [classes.SideDrawer, classes.Open];

  return (
    <React.Fragment>
      <Backdrop show={props.open} clicked={props.closed}/>
      <div className={attachedClasses.join(' ')}>
        <div style={{height: '11%',marginBottom: '32px'}}>
        <Logo/>
        </div>
        <nav>
          <NavigationList/>
        </nav>
      </div>
    </React.Fragment>
  )
}

export default sideDrawer;