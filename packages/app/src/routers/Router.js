/**
 * @flow
 */
import React from 'react';
import { Route, RouterInterface, RouteChangeListener } from '../types';
import Frame from '../Frame';

class Router implements RouterInterface {
  routes: Array<Route>;
  currentRoute: Route;
  frame: Frame;
  listeners: Array<RouteChangeListener>

  constructor(routes: Array<Route>) {
    this.routes = routes;

    this.currentRoute = routes[0];
  }

  getCurrentRoute() {
    return this.currentRoute;
  }

  attach(frame: Frame) {
    if (this.frame !== frame) {
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

  startTransition() {
    // Start any animation here
  }

  render({ width, height }) {
    const Screen = this.currentRoute.screen;

    return <Screen />;
  }
}

export default Router;
