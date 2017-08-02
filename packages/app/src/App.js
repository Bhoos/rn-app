// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Router } from './types';

type DefaultProps = {

};

type Props = {
  children: PropTypes.element,
  router: Router,
};

type State = {
  currentRoute: object,
};

class App extends Component <DefaultProps, Props, State> {
  static childContextTypes = {
    router: PropTypes.object,
  };

  getChildContext() {
    return this.props.router;
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

export default App;
