import React from 'react';
import Skeleton from 'react-loading-skeleton';
import './index.scss';

const Loader = () => {
  return (
    <div className="loader" data-testid="loader">
      <Skeleton height={`5%`} width={`50%`} className="header" />
      <Skeleton height={`65%`} width={`80%`} className="content" />
      <div className="loader-btn">
        <Skeleton height={`50px`} width={`150px`} />
        <Skeleton height={`50px`} width={`150px`} />
      </div>
      <div className="description">
        <Skeleton height={`2%`} width={`100%`} count={6} className="explanation" />
      </div>
    </div>
  );
};

export default Loader;
