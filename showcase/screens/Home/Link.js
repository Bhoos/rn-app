import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text } from 'react-native';

import { linkRouter } from '@bhoos/rn-app';

const Link = ({ goto, title, path, description, ...other }) => (
  <TouchableOpacity onPress={() => goto(path, other)}>
    <Text>{title}</Text>
    <Text>{description}</Text>
  </TouchableOpacity>
);

Link.propTypes = {
  goto: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  description: PropTypes.string,
};

Link.defaultProps = {
  description: null,
};

export default linkRouter(router => ({
  goto: path => router.setPath(path),
  title: router.getCurrentRoute().title,
  description: router.getCurrentRoute().description,
}))(Link);
