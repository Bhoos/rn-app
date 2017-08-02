// @flow
import { Element } from 'react';
import Router from './Router';
import {
  Route,
  RouteId,
  RouteChangeListener,
  RouteListenerUnsubscribe,
  Scene,
} from '../types';

class DefaultRouter extends Router {
  routes: Array<Route>;
  currentRoute: RouteId;
  listeners: Array<RouteChangeListener>;

  appInstance: Component;
  inTransition: ?string;
  scenes: Array<Element>;

  constructor(routes: Array<Route>, initialRoute: string | RouteId) {
    super(routes);
    this.currentRoute = typeof initialRoute === 'string' ? {
      path: initialRoute,
      params: {},
    } : initialRoute;
    this.listeners = [];
    this.frame = null;
    this.inTransition = true;
    this.scenes = [];
  }

  getRoute(path: string): Route {
    return this.routes.find(route => route.path === path);
  }

  getCurrentRoute(): RouteId {
    return this.getCurrentRoute;
  }

  show(path: string, params?: object): Promise<Scene> {
    // If another transition is in progress, fail silently (with warning in dev mode)
    if (this.inTransition) {
      // eslint-disable-next-line no-console
      console.warn(`Transition to ${path} dropped silently as another transition to ${this.inTransition} is in progress`);
      return Promise.resolve(null);
    }

    // If the current path is same as the previous one
    // Only the params might have changed, in which case
    // no transitions would be needed, just change the props
    if (path === this.currentRoute.path) {
      this.appInstance.updateSceneParams(params);
      return Promise.resolve(this.currentRoute.scene);
    }

    // The path has changed its time to start a transition
    const oldRoute = this.currentRoute;
    const newRoute = { path, params };

    this.inTransition = true;
    return this.appInstance.transition(oldRoute, newRoute)
      .then((scene) => {
        newRoute.scene = scene;
        this.currentRoute = newRoute;
        this.inTransition = false;
        return scene;
      });
  }
}

export default DefaultRouter;
