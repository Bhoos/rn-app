import React from 'react';
import { Animated, ViewPropTypes } from 'react-native';
// import { transitionStyle } from '@bhoos/rn-app';

const logo = require('./logo.png');

const Logo = ({ style }) => <Animated.Image style={style} source={logo} />;

Logo.propTypes = {
  style: ViewPropTypes.style,
};

Logo.defaultProps = {
  style: null,
};

// export default transitionStyle()(({ style }) => <Animated.Image style={style} source={logo} />);
export default Logo;
