/**
 * @flow
 */
import React from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import Router from './Router';

class TabRouter extends Router {

  transitionDriver = new Animated.Value(0);

  render({ width }) {
    // Render all the screens at once
    this.routes.map((route, idx) => {
      const Screen = route.screen;
      const animStyle = {
        transforms: [
          { translateX: this.transitionDriver.interpolate({
            inputRange: [idx, idx + 1],
            outputRange: [0, width],
          }) }
        ]
      };

      return (
        <View key={route.path} style={[StyleSheet.absoluteFill, animStyle]}>
          <Screen />
        </View>
      );
    });
  }
}

export default function (routes) {
  return new TabRouter(routes);
}
