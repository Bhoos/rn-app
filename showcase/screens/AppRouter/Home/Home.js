import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Link } from '@bhoos/rn-app';

import Logo from './Logo';

class Home extends Component {
  render() {
    return (
      <View>
        <Logo />
        <Link path="play">
          <Text>Play</Text>
        </Link>
      </View>
    );
  }
}

export default Home;
