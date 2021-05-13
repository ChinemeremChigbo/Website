import React from 'react';
import './Nonprofits.scss';

export default function Nonprofits() {
  //Temporary inline styling. Should be changed when real code is added
  return (
    <div
      style={{
        background: 'url("../../assets/Background.png") fixed',
        backgroundSize: 'cover',
      }}
      className="nonprofits"
    >
      {' '}
      For nonprofits
    </div>
  );
}
