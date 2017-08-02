import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

import linkRouter from './linkRouter';

const Back = ({ onBack, children }) => (
  <TouchableOpacity onPress={onBack}>
    {children}
  </TouchableOpacity>
);

Back.propTypes = {
  onBack: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default linkRouter(router => ({
  onBack: router.back,
}))(Back);
