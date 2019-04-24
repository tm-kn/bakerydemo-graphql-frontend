import React from 'react';
import PropTypes from 'prop-types';

const RichText = ({ children }) => (
  <div dangerouslySetInnerHTML={{ __html: children }} />
);

RichText.propTypes = {
  children: PropTypes.node.isRequired
};

export default RichText;
