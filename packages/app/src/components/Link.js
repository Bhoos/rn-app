import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';
import { Router } from '../routers';

const oneAndOnlyOne = (props, propName, componentName, location, propFullName) => {
  const textType = typeof props.text;

  // First validate type of text
  if (props.text && textType !== 'string') {
    return new Error(`Invalid ${location} ${propFullName} of type ${textType} supplied to ${componentName}, expected string.`);
  }

  if (!props.text && !props.children) {
    return new Error('The `Link` component requires either `text` or `children` set, but none was provided');
  }

  if (props.text && props.children) {
    return new Error('The `Link` component was provided both the `text` and `childdren` property.');
  }

  return null;
};

class Link extends Component {
  static propTypes = {
    path: PropTypes.string.isRequired,
    children: PropTypes.oneOfType(PropTypes.node, PropTypes.arrayOf(PropTypes.node)),
    text: oneAndOnlyOne,
  }

  static defaultProps = {
    text: null,
    children: null,
  };

  static contextTypes = {
    router: PropTypes.instanceOf(Router).isRequired,
  }

  onPress = () => {
    this.context.router.setPath(this.props.path);
  }

  render() {
    const { text, children } = this.props;

    const child = children || <Text>{text}</Text>;

    return (
      <TouchableOpacity onPress={this.onPress}>
        {child}
      </TouchableOpacity>
    );
  }
}

export default Link;
