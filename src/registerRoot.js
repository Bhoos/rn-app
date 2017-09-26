import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';

export default function registerRoot(name, router) {
  const Root = (<App router={router} />);

  AppRegistry.registerComponent(name, Root);
}
