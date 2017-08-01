import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, ViewPropTypes } from 'react-native';

export default function SceneFactory(options) {
  function getStyle(props) {
    if (!props.style) {
      return null;
    }

    if (typeof props.style === 'function') {
      return props.style(transitionDriver);
    }

    return props.style;
  }

  return class Screen extends Component {
    static propTypes = {
      style: PropTypes.oneOfType([
        ViewPropTypes.style,
        PropTypes.func,
      ]),
      children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
      ]).isRequired,
    };

    static defaultProps = {
      style: null,
    };

    constructor(props) {
      super(props);

      this.state = {
        style: getStyle(props),
      };
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.style !== this.props.style) {
        this.setState({
          style: getStyle(nextProps),
        });
      }
    }

    shouldComponentUpdate(nextProps) {
      return nextProps.style !== this.props.style;
    }

    render() {
      const { style } = this.state;
      return (
        <Animated.View style={style}>
          {this.props.children}
        </Animated.View>
      );
    }
  };
}
