import React from 'react';
import error from "../assets/404.svg"
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <img
        src={error} 
        alt="404 Not Found"
        style={{ maxWidth: '100%', marginBottom: '20px' }}
      />
      <h1>Oops! Page not found.</h1>
      <p className='text-secondary'>
        The page you are looking for might be in another castle.{' '}
        <Link to="/">Go back home</Link>.
      </p>
    </div>
  );
};

export default NotFound;