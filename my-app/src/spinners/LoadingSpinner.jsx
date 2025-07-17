import React from 'react';
import { RingLoader } from 'react-spinners';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container">
      <RingLoader color="#36D7B7" loading={true} size={100} />
    </div>
  );
};

export default LoadingSpinner;