import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import { NavigationItem } from '@bhoos/rn-app';

const demos = [
  { path: 'app', title: 'App Router', description: 'App router and navigator' },
  { path: 'theme', title: 'Theme', description: 'Theme support' },
];

const config = {
  screenWillShow() {

  },

  screenDidShow() {

  },

  screenWillHide() {

  },

  screenDidHide() {

  },
};

class Home extends Component {
  render() {
    return (
      <ScrollView>
        { demos.map(demo => (
          <NavigationItem key={demo.path} route={demo} />
        ))}
      </ScrollView>
    );
  }
}

export default Home;

