// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Router } from './types';

type DefaultProps = {

};

type Props = {
  children: PropTypes.element,
  router: Router,
  initialPath: string,
};

type State = {
  currentRoute: object,
};

class App extends Component <DefaultProps, Props, State> {
  static contextTypes = {
    getInitialPath: PropTypes.func,
  }

  static childContextTypes = {
    router: PropTypes.object,
    getInitialPath: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    // Extract the initial path from the higher level apps (context)
    const path = (context.getInitialPath && context.getInitialPath()) || props.initialPath;

    // Let the router consume the initial path returning the remaining part of the
    // path for the child apps
    this.initialPath = props.router.setInitialPath(path);
  }

  getChildContext() {
    return {
      router: this.props.router,
      getInitialPath: () => this.initialPath,
    };
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

export default App;
