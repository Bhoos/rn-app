/**
 * A container for displaying `Screen` for
 * the app based on the current route.
 *
 * @flow
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

import Router from './routers/Router';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: '#eee',
  }
});

class Frame extends Component {
  static contextTypes = {
    router: PropTypes.instanceOf(Router).isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      width: 0,
      height: 0,
    };
  }

  componentDidMount() {
    this.context.router.attach(this);
  }

  componentDidUpdate() {
    // Time to start the animation
    this.context.router.startTransition();
  }

  componentWillUnmount() {
    this.context.router.detach(this);
  }

  onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    if (width !== this.state.width || height !== this.state.height) {
      this.setState({
        width, height,
      });
    }
  }

  render() {
    const { width, height } = this.state;

    return (
      <View style={styles.container} onLayout={this.onLayout}>
        { width > 0 && this.context.router.render({ width, height }) }
      </View>
    );
  }
}

export default Frame;
