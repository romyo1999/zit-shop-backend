import React from 'react';
import { PropagateLoader } from 'react-spinners';

const Spinner = () => {
  return (
    <div className="spinner">
      <PropagateLoader color="white" loading={true} size={15} />
    </div>
  );
};

export default Spinner;
