import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router';


const Header = () => (
  <nav className='nav'>
    <ul>
      <li>Home</li>
      <li>Explore</li>
      <li>Cart</li>
    </ul>
  </nav>
);

export default Header;
