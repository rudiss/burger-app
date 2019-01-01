import React from 'react';
import classes from './Toolbar.css'
import Logo from '../../Logo/Logo';
import NavigationList from '../NavigationList/NavigationList';
import MenuToggle from '../SideDrawer/MenuToggle/MenuToggle';

const toolbar = props => (
  <header className={classes.Toolbar}>
    <MenuToggle clicked={props.menuToggleClicked}/>
    <Logo />
    <nav className={classes.DesktopOnly}>
      <NavigationList/>
    </nav>
  </header>
);

export default toolbar;