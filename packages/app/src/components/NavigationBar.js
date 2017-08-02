import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, View, Text } from 'react-native';

import linkRouter from './linkRouter';

class NavigationBar extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    // const { currentRoute, currentStyle, outgoingRoute, outgoingStyle } = this.state;
    const { title } = this.props;

    return (
      <View>
        <Text>{title}</Text>
      </View>
    );
  }
}

export default linkRouter(router => ({
  title: router.getCurrentRoute().title,
}))(NavigationBar);
