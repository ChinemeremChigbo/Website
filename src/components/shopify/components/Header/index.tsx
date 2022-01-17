import React from 'react';
import { ReactComponent as Nasa } from '../../assets/images/rocket.svg';
import './index.scss';

const Header = () => {
  return (
    <div className="header">
      <header>NASA'S ASTRONOMY PICTURE OF THE DAY</header>
      <Nasa width={20} height="auto" />
    </div>
  );
};

export default Header;
