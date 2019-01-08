import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationList.css'

const navigationList = () => (
  <ul className={classes.NavigationList}>
    <NavigationItem link="/">Burger Builder</NavigationItem>
    <NavigationItem link="/orders">Orders</NavigationItem>
  </ul>
);

export default navigationList;