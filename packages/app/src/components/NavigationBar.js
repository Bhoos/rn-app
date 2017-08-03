import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, Platform, View, Text, StyleSheet, ViewPropTypes, StatusBar } from 'react-native';

import linkRouter from './linkRouter';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    paddingTop: Platform.OS === 'ios' ? 30 : 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#aaa',
    backgroundColor: '#eee',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    paddingBottom: 10,
    paddingHorizontal: 5,
    paddingTop: Platform.OS === 'ios' ? 30 : 10,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  backContainer: {
    color: 'blue',
  },
  back: {
    fontSize: 18,
  },
});

class NavigationBar extends Component {
  static propTypes = {
    style: ViewPropTypes.style,
    title: PropTypes.string.isRequired,
    backTitle: PropTypes.string,
    back: PropTypes.func,
  };

  static defaultProps = {
    backTitle: null,
    style: null,
    back: null,
  };

  render() {
    // const { currentRoute, currentStyle, outgoingRoute, outgoingStyle } = this.state;
    const { title, style, back, backTitle } = this.props;

    return (
      <View style={[styles.container, style]}>
        <Text style={styles.title}>{title}</Text>
        { back && (
          <View style={styles.overlay}>
            <Text style={styles.backContainer} onPress={back}>
              <Text style={styles.back}> ❬ </Text>
              <Text>{backTitle}</Text>
            </Text>
          </View>
         ) }
      </View>
    );
  }
}

export default linkRouter((router) => {
  const backRoute = router.getBackRoute();
  return {
    title: router.getCurrentRoute().title,
    back: backRoute && router.back,
    backTitle: backRoute && backRoute.title,
  };
})(NavigationBar);
