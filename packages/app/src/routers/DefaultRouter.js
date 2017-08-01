// @flow
import { Element } from 'react';
import {
  Router,
  Route,
  RouteId,
  RouteChangeListener,
  RouteListenerUnsubscribe,
  Scene,
} from '../types';

class DefaultRouter implements Router {
  routes: Array<Route>;
  currentRoute: RouteId;
  listeners: Array<RouteChangeListener>;

  appInstance: Component;
  inTransition: ?string;
  scenes: Array<Element>;

  constructor(routes: Array<Route>, initialRoute: string | RouteId) {
    this.routes = routes;
    this.currentRoute = typeof initialRoute === 'string' ? {
      path: initialRoute,
      params: {},
    } : initialRoute;
    this.listeners = [];
    this.appInstance = null;
    this.inTransition = true;
    this.scenes = [];
  }

  attach(app: Component) {
    this.appInstance = app;
  }

  detach(app: Component) {
    if (this.appInstance !== app) {
      throw new Error('detaching an app that wasn\'t attached in the first place');
    }
    this.appInstance = null;
  }

  getRoute(path: string): Route {
    return this.routes.find(route => route.path === path);
  }

  getCurrentRoute(): RouteId {
    return this.getCurrentRoute;
  }

  addRouteChangeListener(listener: RouteChangeListener): RouteListenerUnsubscribe {
    this.listeners.push(listener);
    return () => {
      const idx = this.listeners.indexOf(listener);
      if (idx >= 0) {
        this.listeners.splice(idx, 1);
      }
    };
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
