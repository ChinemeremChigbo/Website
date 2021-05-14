import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
  return (
    //SVG of Blueprint Logo and Name
    <div className="background">
      <img style={{ width: '100%' }} className="name" src="Name.svg" alt="Chinemerem Chigbo"></img>
    </div>
  );
};

export default Navbar;
