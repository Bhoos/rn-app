import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    left: 0,
    top: 0,
    right: 0,
    height: 50,
  },
});

class TopBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Coins</Text>
        <Text>Chips</Text>
      </View>
    );
  }
}

export default TopBar;
