import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, View } from 'react-native';

import App from '@bhoos/rn-app';

function createStyle(driver, incoming) {
  return ({
    opacity: incoming ? driver.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    }) : driver,
  });
}

class NavigationBar extends Component {
  static propTypes = {
    route: PropTypes.string.isRequired,
    transitionDriver: PropTypes.instanceOf(Animated.Animated),
  };

  static defaultProps = {
    transitionDriver: new Animated.Value(0),
  };

  state = {
    currentRoute: this.props.route,
    currentStyle: createStyle(this.props.transitionDriver, true),
    outgoingRoute: null,
    outgoingStyle: null,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.route !== this.props.route) {
      this.setState({
        currentRoute: nextProps.route,
        currentStyle: createStyle(nextProps.transitionDriver, true),
        outgoingRoute: this.props.route,
        outgoingStyle: createStyle(nextProps.transitionDriver, false),
      });
    }
  }

  render() {
    const { currentRoute, currentStyle, outgoingRoute, outgoingStyle } = this.state;

    return (
      <View>
        { outgoingRoute &&
          <Animated.Text style={outgoingStyle}>{outgoingRoute.title}</Animated.Text> }
        { currentRoute &&
          <Animated.Text style={currentStyle}>{currentRoute.title}</Animated.Text> }
      </View>
    );
  }
}

export default App.linkTransition((nextRoute, transitionDriver) => ({
  title: nextRoute.title,
  transitionDriver,
}))(NavigationBar);
