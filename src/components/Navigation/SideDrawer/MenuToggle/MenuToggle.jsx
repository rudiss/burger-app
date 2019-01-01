import React from 'react';
import classes from './MenuToogle.css'
const menuToggle = props => (
  <div className={classes.MenuToggle} onClick={props.clicked}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default menuToggle;