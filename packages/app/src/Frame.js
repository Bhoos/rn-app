import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

class Frame extends Component {
  static contextTypes = {
    registerRouterFrame: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);

    this.state = {
      screens: [],
    };
  }

  componentWillMount() {
    const { registerRouterFrame } = this.context;
    registerRouterFrame(this);
  }

  render() {
    const { screens } = this.state;

    return (
      <View style={styles.container}>
        {screens}
      </View>
    );
  }
}

export default Frame;
