import React from 'react';
import { View, StyleSheet } from 'react-native';
import App, { Frame, DefaultRouter } from '@bhoos/rn-app';

import TopBar from './TopBar';
import Home from './Home';
import Gift from './Gift';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const router = DefaultRouter([
  { path: '', title: '', screen: Home },
  { path: 'gift', title: 'Gift', screen: Gift },
]);

const AppRouterDemo = () => (
  <App router={router}>
    <View style={styles.container}>
      <Frame style={StyleSheet.absoluteFill} />
      <TopBar />
    </View>
  </App>
);

export default AppRouterDemo;
