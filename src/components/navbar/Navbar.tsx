import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
  return (
    //SVG of Blueprint Logo and Name
    <div className="background">
      <img className="name" src="Name.svg" alt="Chinemerem Chigbo"></img>
      <img className="name" src="PressEnter.png" alt="Press Enter"></img>
    </div>
  );
};

export default Navbar;
