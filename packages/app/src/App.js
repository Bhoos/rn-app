import React, { Component } from 'react';
import PropTypes from 'prop-types';

const RouteProp = PropTypes.shape({
  name: PropTypes.string.isRequired,
  component: PropTypes.instanceOf(Component).isRequired,
  title: PropTypes.string.isRequired,
});

class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    routes: PropTypes.arrayOf(RouteProp).isRequired,
    defaultRoute: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        params: PropTypes.object.isRequired,
      }),
    ]),
  };

  static defaultProps = {
    defaultRoute: null,
  };

  static childContextTypes = {
    setRoute: PropTypes.func.isRequired,
    getCurrentRoute: PropTypes.func.isRequired,
    addRouteChangeListener: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      currentRoute: props.defaultRoute,
    };

    this.listeners = [];

    this.childContext = {
      setRoute: (name, params, direction) => {
        this.setRoute(name, params, direction);
      },

      getCurrentRoute: () => this.state.currentRoute,

      addRouteChangeListener: (callback) => {
        this.listeners.push(callback);

        return () => {
          const idx = this.listeners.indexOf(callback);
          if (idx >= 0) {
            this.listeners.splice(idx, 1);
          }
        };
      }
    };
  }

  setRoute(name, params, direction) {

  }

  getChildContext() {
    return this.childContext;
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

export default App;
