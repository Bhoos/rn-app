import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Router } from '../routers';

export default function linkRouter(mapRouterToProps) {
  return UserComponent => class RouteComponent extends Component {
    static contextTypes = {
      router: PropTypes.instanceOf(Router),
    };

    constructor(props, context) {
      super(props, context);

      this.state = mapRouterToProps(context.router);
    }

    componentDidMount() {
      this.unregister = this.context.router.addListener(() => {
        this.setState(mapRouterToProps(this.context.router));
      });
    }

    componentWillUnmount() {
      this.unregister();
    }

    render() {
      return <UserComponent {...this.state} {...this.props} />;
    }
  };
}
