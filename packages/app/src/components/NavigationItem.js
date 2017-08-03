import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import linkRouter from './linkRouter';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#aaa',
  },
  text: {
    flex: 1,
  },
});

const NavigationItem = ({ route, showRoute }) => (
  <TouchableOpacity style={styles.container} onPress={() => showRoute(route.path)}>
    <Text style={styles.text}>{route.title}</Text>
    <Text>❯</Text>
  </TouchableOpacity>
);

NavigationItem.propTypes = {
  route: PropTypes.shape({
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  showRoute: PropTypes.func.isRequired,
};

export default linkRouter(router => ({
  showRoute: path => router.setPath(path),
}))(NavigationItem);
