import React from 'react'
import PropTypes from 'prop-types';

const ErrorMessage = (error) => {
    return (
      <>
        <h2>We're sorry, an error has occurred: </h2>
        <h3>{error.props}</h3>
        <p>Please check that you have entered a unique name.  All names must be unique.</p>
      </>
        
    );
}

ErrorMessage.propTypes = {
  error: PropTypes.number
}
export default ErrorMessage;