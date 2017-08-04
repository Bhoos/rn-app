/**
 * @flow
 */
import React from 'react';
import { Route, RouterInterface, RouteChangeListener } from '../types';
import Frame from '../Frame';

import findRoute from './findRoute';

class Router implements RouterInterface {
  routes: Array<Route>;
  currentRoute: Route;
  frame: Frame;
  listeners: Array<RouteChangeListener>

  routeStack: Array<Route>;

  constructor(routes: Array<Route>) {
    this.routes = routes;
    this.listeners = [];
    this.currentRoute = null;
    this.frame = null;

    this.routeStack = [];
  }

  setInitialPath(path) {
    const res = findRoute(path, this.routes);
    this.currentRoute = res.route || this.routes[0];
    return res.remaining;
  }

  getCurrentRoute() {
    return this.currentRoute;
  }

  attach(frame: Frame) {
    if (this.frame !== null) {
      throw new Error('Trying to attach multiple frames. There must be one and only one <Frame /> within an <App />');
    }

    this.frame = frame;
  }

  detach(frame: Frame) {
    if (this.frame !== frame) {
      throw new Error('detaching an app that wasn\'t attached in the first place');
    }
    this.frame = null;
  }

  addListener(listener: RouteChangeListener): RouteListenerUnsubscribe {
    this.listeners.push(listener);
    return () => {
      const idx = this.listeners.indexOf(listener);
      if (idx >= 0) {
        this.listeners.splice(idx, 1);
      }
    };
  }

  setPath(path) {
    // Does it start with a '/' in which case, search for the root router
    const res = findRoute(path, this.routes);

    // Make sure we have found a route for the given path
    // And its not the current route
    if (res.route && res.route !== this.currentRoute) {
      this.routeStack.push(this.currentRoute);

      this.setCurrentRoute(res.route);
    }
  }

  canBack() {
    return this.routeStack.length > 0;
  }

  getBackRoute() {
    if (this.routeStack.length === 0) {
      return null;
    }
    return this.routeStack[this.routeStack.length - 1];
  }

  setCurrentRoute(route) {
    this.currentRoute = route;

    // Fire up all the listeners
    this.listeners.forEach(listener => listener(this));

    // Update the frame
    this.frame.forceUpdate();
  }

  back = () => {
    if (this.routeStack.length === 0) {
      return;
    }

    const route = this.routeStack.pop();
    this.setCurrentRoute(route);
  }

  startTransition() {
    // Start any animation here
  }

  render({ width, height }) {
    const Screen = this.currentRoute.screen;
    return <Screen />;
  }
}

export default Router;
