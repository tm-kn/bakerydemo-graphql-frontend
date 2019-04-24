import React from 'react';
import PropTypes from 'prop-types';

const Heading = ({ size, children }) => {
  switch (size) {
    case 'h3':
      return <h3>{children}</h3>;
    case 'h4':
      return <h4>{children}</h4>;
    case 'h5':
      return <h5>{children}</h5>;
    case 'h6':
      return <h6>{children}</h6>;
    case 'h7':
      return <h7>{children}</h7>;
    case 'h8':
      return <h8>{children}</h8>;
    default:
      return <h2>{children}</h2>;
  }
};

Heading.defaultProps = {
  size: 'h2'
};

Heading.propTypes = {
  size: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default Heading;
