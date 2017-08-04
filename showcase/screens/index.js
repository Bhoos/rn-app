import React from 'react';
import App, { DefaultRouter, NavigationBar, Frame } from '@bhoos/rn-app';
import { View, StyleSheet } from 'react-native';

import Home from './Home';
import AppRouter from './AppRouter';
import Theme from './Theme';

const rootRouter = DefaultRouter([
  { path: '', title: 'Bhoos Showcase', screen: Home },
  { path: 'app', title: 'App Router', screen: AppRouter },
  { path: 'theme', title: 'Theme', screen: Theme },
]);

const ShowcaseDemo = () => (
  <App router={rootRouter} initialPath="">
    <View style={StyleSheet.absoluteFill}>
      <NavigationBar />
      <Frame />
    </View>
  </App>
);

export default ShowcaseDemo;
